package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ifbm/backend/internal/handler"
	"github.com/ifbm/backend/internal/instagram"
	"github.com/ifbm/backend/internal/middleware"
	"github.com/ifbm/backend/internal/store"
)

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	// Initialize database store
	db, err := store.New()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Run migrations
	if err := db.RunMigrations("migrations/001_initial.sql"); err != nil {
		log.Printf("Migration warning (may already be applied): %v", err)
	}

	// Initialize handlers
	h := &handler.Handler{Store: db}

	// Initialize rate limiter (10 requests per minute for POST endpoints)
	rl := middleware.NewRateLimiter(10, time.Minute)

	// Set up routes
	mux := http.NewServeMux()

	// Health
	mux.HandleFunc("GET /api/v1/health", h.Health)

	// Stats (no rate limiting)
	mux.HandleFunc("GET /api/v1/stats", h.GetStats)

	// Members (rate limited)
	mux.Handle("POST /api/v1/members", rl.Limit(http.HandlerFunc(h.JoinMember)))

	// Contact (rate limited)
	mux.Handle("POST /api/v1/contact", rl.Limit(http.HandlerFunc(h.SubmitContact)))

	// Apply global middleware
	var finalHandler http.Handler = mux
	finalHandler = middleware.CORS(finalHandler)
	finalHandler = middleware.Logger(finalHandler)

	// Start Instagram refresher
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	igRefresher := instagram.NewRefresher(db)
	igRefresher.Start(ctx)

	// Determine port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := &http.Server{
		Addr:         ":" + port,
		Handler:      finalHandler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful shutdown
	go func() {
		sigCh := make(chan os.Signal, 1)
		signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
		<-sigCh

		log.Println("Shutting down server...")
		cancel()

		shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer shutdownCancel()

		if err := server.Shutdown(shutdownCtx); err != nil {
			log.Fatalf("Server forced to shutdown: %v", err)
		}
	}()

	log.Printf("Server starting on :%s", port)
	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatalf("Server error: %v", err)
	}

	log.Println("Server stopped gracefully")
}

package store

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"time"

	_ "github.com/lib/pq"

	"github.com/ifbm/backend/internal/model"
)

// Store wraps the database connection and provides data access methods.
type Store struct {
	db *sql.DB
}

// New creates a new Store with a PostgreSQL connection.
func New() (*Store, error) {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = os.Getenv("POSTGRES_URL")
	}
	if dsn == "" {
		dsn = "postgresql://postgres:IGPofnyVXOsrCXOSloutclkpZqWFDFDx@postgres-production-69d3.up.railway.app:5432/railway"
	}

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &Store{db: db}, nil
}

// Close closes the database connection.
func (s *Store) Close() error {
	return s.db.Close()
}

// RunMigrations executes the SQL migration file.
func (s *Store) RunMigrations(migrationFile string) error {
	data, err := os.ReadFile(migrationFile)
	if err != nil {
		return fmt.Errorf("failed to read migration file: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	_, err = s.db.ExecContext(ctx, string(data))
	if err != nil {
		return fmt.Errorf("failed to run migration: %w", err)
	}

	return nil
}

// InsertMember inserts a new movement member. Returns true if inserted,
// false if the email already exists.
func (s *Store) InsertMember(ctx context.Context, req model.MemberRequest) (bool, error) {
	query := `
		INSERT INTO members (name, email, city, state, contribute)
		VALUES ($1, $2, $3, $4, $5)
		ON CONFLICT (email) DO NOTHING
	`
	result, err := s.db.ExecContext(ctx, query,
		req.Name, req.Email, req.City, req.State, req.Contribute,
	)
	if err != nil {
		return false, fmt.Errorf("failed to insert member: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return false, fmt.Errorf("failed to get rows affected: %w", err)
	}

	return rows > 0, nil
}

// InsertContact inserts a new contact form submission.
func (s *Store) InsertContact(ctx context.Context, req model.ContactRequest) error {
	query := `
		INSERT INTO contacts (name, email, message)
		VALUES ($1, $2, $3)
	`
	_, err := s.db.ExecContext(ctx, query, req.Name, req.Email, req.Message)
	if err != nil {
		return fmt.Errorf("failed to insert contact: %w", err)
	}
	return nil
}

// GetStats retrieves cached movement statistics.
func (s *Store) GetStats(ctx context.Context) (model.StatsResponse, error) {
	rows, err := s.db.QueryContext(ctx, `SELECT key, value, updated_at FROM stats_cache`)
	if err != nil {
		return model.StatsResponse{}, fmt.Errorf("failed to query stats: %w", err)
	}
	defer rows.Close()

	stats := model.StatsResponse{
		Instagram: model.InstagramStats{
			Username: "indianfootballbachaomovement",
		},
	}

	for rows.Next() {
		var key, value string
		var updatedAt time.Time
		if err := rows.Scan(&key, &value, &updatedAt); err != nil {
			continue
		}
		switch key {
		case "instagram_followers":
			if n, err := strconv.Atoi(value); err == nil {
				stats.Instagram.Followers = n
				stats.Instagram.UpdatedAt = updatedAt
			}
		case "campaign_posts":
			if n, err := strconv.Atoi(value); err == nil {
				stats.Movement.CampaignPosts = n
			}
		}
	}

	return stats, nil
}

// UpdateStat updates a cached stat value.
func (s *Store) UpdateStat(ctx context.Context, key string, value string) error {
	query := `
		INSERT INTO stats_cache (key, value, updated_at)
		VALUES ($1, $2, NOW())
		ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()
	`
	_, err := s.db.ExecContext(ctx, query, key, value)
	return err
}

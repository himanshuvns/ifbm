package instagram

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/ifbm/backend/internal/store"
)

// Refresher periodically fetches Instagram follower count from the Meta API
// and caches it in the database. Disabled by default in V1.
type Refresher struct {
	store    *store.Store
	userID   string
	token    string
	interval time.Duration
}

type igResponse struct {
	FollowersCount int    `json:"followers_count"`
	ID             string `json:"id"`
}

// NewRefresher creates a new Instagram stats refresher.
func NewRefresher(s *store.Store) *Refresher {
	return &Refresher{
		store:    s,
		userID:   os.Getenv("INSTAGRAM_USER_ID"),
		token:    os.Getenv("INSTAGRAM_ACCESS_TOKEN"),
		interval: 30 * time.Minute,
	}
}

// Start begins the refresh loop in a goroutine. Only starts if the
// INSTAGRAM_REFRESH_ENABLED env var is set to "true".
func (r *Refresher) Start(ctx context.Context) {
	enabled := os.Getenv("INSTAGRAM_REFRESH_ENABLED")
	if enabled != "true" {
		log.Println("[instagram] refresh disabled (set INSTAGRAM_REFRESH_ENABLED=true to enable)")
		return
	}

	if r.userID == "" || r.token == "" {
		log.Println("[instagram] missing INSTAGRAM_USER_ID or INSTAGRAM_ACCESS_TOKEN")
		return
	}

	log.Printf("[instagram] starting refresh loop (interval: %s)", r.interval)

	go func() {
		// Initial fetch
		r.fetch(ctx)

		ticker := time.NewTicker(r.interval)
		defer ticker.Stop()

		for {
			select {
			case <-ticker.C:
				r.fetch(ctx)
			case <-ctx.Done():
				log.Println("[instagram] refresh loop stopped")
				return
			}
		}
	}()
}

func (r *Refresher) fetch(ctx context.Context) {
	url := fmt.Sprintf(
		"https://graph.instagram.com/%s?fields=followers_count&access_token=%s",
		r.userID, r.token,
	)

	reqCtx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(reqCtx, http.MethodGet, url, nil)
	if err != nil {
		log.Printf("[instagram] failed to create request: %v", err)
		return
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("[instagram] request failed: %v", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Printf("[instagram] unexpected status %d", resp.StatusCode)
		return
	}

	var igResp igResponse
	if err := json.NewDecoder(resp.Body).Decode(&igResp); err != nil {
		log.Printf("[instagram] failed to decode response: %v", err)
		return
	}

	if igResp.FollowersCount > 0 {
		err := r.store.UpdateStat(ctx, "instagram_followers", strconv.Itoa(igResp.FollowersCount))
		if err != nil {
			log.Printf("[instagram] failed to update cache: %v", err)
			return
		}
		log.Printf("[instagram] updated followers count: %d", igResp.FollowersCount)
	}
}

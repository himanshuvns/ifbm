package model

import "time"

// MemberRequest is the JSON body for POST /api/v1/members.
type MemberRequest struct {
	Name       string `json:"name"`
	Email      string `json:"email"`
	City       string `json:"city"`
	State      string `json:"state"`
	Contribute string `json:"contribute"`
	HPField    string `json:"hp_field"` // honeypot
}

// ContactRequest is the JSON body for POST /api/v1/contact.
type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
	HPField string `json:"hp_field"` // honeypot
}

// StatsResponse is the JSON response for GET /api/v1/stats.
type StatsResponse struct {
	Instagram InstagramStats  `json:"instagram"`
	Movement  MovementStats   `json:"movement"`
}

type InstagramStats struct {
	Username  string    `json:"username"`
	Followers int       `json:"followers"`
	UpdatedAt time.Time `json:"updated_at"`
}

type MovementStats struct {
	CampaignPosts int `json:"campaign_posts"`
}

// APIResponse is a generic response envelope.
type APIResponse struct {
	Message string `json:"message,omitempty"`
	Error   string `json:"error,omitempty"`
}

// HealthResponse for GET /api/v1/health.
type HealthResponse struct {
	Status string `json:"status"`
}

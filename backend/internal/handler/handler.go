package handler

import (
	"encoding/json"
	"net/http"
	"regexp"
	"strings"

	"github.com/ifbm/backend/internal/model"
	"github.com/ifbm/backend/internal/store"
)

var emailRegexp = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

// Handler holds route dependencies.
type Handler struct {
	Store *store.Store
}

// Health handles GET /api/v1/health.
func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, model.HealthResponse{Status: "ok"})
}

// GetStats handles GET /api/v1/stats.
func (h *Handler) GetStats(w http.ResponseWriter, r *http.Request) {
	stats, err := h.Store.GetStats(r.Context())
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, model.APIResponse{Error: "Failed to fetch stats."})
		return
	}
	writeJSON(w, http.StatusOK, stats)
}

// JoinMember handles POST /api/v1/members.
func (h *Handler) JoinMember(w http.ResponseWriter, r *http.Request) {
	var req model.MemberRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, model.APIResponse{Error: "Invalid request body."})
		return
	}

	// Honeypot check
	if req.HPField != "" {
		// Silently accept (pretend success) to not reveal bot detection
		writeJSON(w, http.StatusCreated, model.APIResponse{Message: "Welcome to the movement!"})
		return
	}

	// Validate
	if errs := validateMember(req); len(errs) > 0 {
		writeJSON(w, http.StatusBadRequest, model.APIResponse{Error: strings.Join(errs, " ")})
		return
	}

	// Trim inputs
	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.City = strings.TrimSpace(req.City)
	req.State = strings.TrimSpace(req.State)
	req.Contribute = strings.TrimSpace(req.Contribute)

	inserted, err := h.Store.InsertMember(r.Context(), req)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, model.APIResponse{Error: "Something went wrong. Please try again."})
		return
	}

	if !inserted {
		writeJSON(w, http.StatusConflict, model.APIResponse{Error: "This email is already registered."})
		return
	}

	writeJSON(w, http.StatusCreated, model.APIResponse{Message: "Welcome to the movement!"})
}

// SubmitContact handles POST /api/v1/contact.
func (h *Handler) SubmitContact(w http.ResponseWriter, r *http.Request) {
	var req model.ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, model.APIResponse{Error: "Invalid request body."})
		return
	}

	// Honeypot check
	if req.HPField != "" {
		writeJSON(w, http.StatusCreated, model.APIResponse{Message: "Message sent successfully."})
		return
	}

	// Validate
	if errs := validateContact(req); len(errs) > 0 {
		writeJSON(w, http.StatusBadRequest, model.APIResponse{Error: strings.Join(errs, " ")})
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.Message = strings.TrimSpace(req.Message)

	if err := h.Store.InsertContact(r.Context(), req); err != nil {
		writeJSON(w, http.StatusInternalServerError, model.APIResponse{Error: "Something went wrong. Please try again."})
		return
	}

	writeJSON(w, http.StatusCreated, model.APIResponse{Message: "Message sent successfully."})
}

// ---- Validation ----

func validateMember(req model.MemberRequest) []string {
	var errs []string
	if len(strings.TrimSpace(req.Name)) < 2 {
		errs = append(errs, "Name must be at least 2 characters.")
	}
	if !emailRegexp.MatchString(strings.TrimSpace(req.Email)) {
		errs = append(errs, "Invalid email address.")
	}
	if len(strings.TrimSpace(req.City)) < 2 {
		errs = append(errs, "City must be at least 2 characters.")
	}
	if strings.TrimSpace(req.State) == "" {
		errs = append(errs, "State is required.")
	}
	return errs
}

func validateContact(req model.ContactRequest) []string {
	var errs []string
	if len(strings.TrimSpace(req.Name)) < 2 {
		errs = append(errs, "Name must be at least 2 characters.")
	}
	if !emailRegexp.MatchString(strings.TrimSpace(req.Email)) {
		errs = append(errs, "Invalid email address.")
	}
	if len(strings.TrimSpace(req.Message)) < 10 {
		errs = append(errs, "Message must be at least 10 characters.")
	}
	return errs
}

// ---- Helpers ----

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

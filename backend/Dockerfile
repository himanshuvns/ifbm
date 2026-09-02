# ---- Build Stage ----
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy source files
COPY . .

# Dynamically handle build regardless of whether context is root or backend/
RUN if [ -f "./backend/go.mod" ]; then \
      cd ./backend && CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server && cp -r migrations /app/migrations; \
    else \
      CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server; \
    fi

# ---- Final Stage ----
FROM alpine:3.19

WORKDIR /app

# Add CA certs for HTTPS calls
RUN apk --no-cache add ca-certificates

# Copy binary and migrations
COPY --from=builder /app/server .
COPY --from=builder /app/migrations ./migrations

EXPOSE 8080

CMD ["./server"]

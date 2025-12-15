# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Copy assets folder to dist
COPY assets ./dist/assets

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install a simple HTTP server to serve static files
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose port (Cloud Run requires 8080)
EXPOSE 8080

# Set environment variable for serve to listen on port 8080
ENV PORT=8080

# Start the server
CMD ["serve", "-s", "dist", "-l", "8080"]

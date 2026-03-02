# Multi-stage Dockerfile for OpenOps Studio v3.0

# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S openops -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY --chown=openops:nodejs package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder stage
COPY --chown=openops:nodejs --from=builder /app/dist ./dist

# Copy configuration files
COPY --chown=openops:nodejs 00_governance ./00_governance
COPY --chown=openops:nodejs 01_orchestration ./01_orchestration
COPY --chown=openops:nodejs 02_agents ./02_agents

# Set environment
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Switch to non-root user
USER openops

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/index.js"]

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the Next.js app
RUN npm run build

# ----------------------------
# 2. Production Image
# ----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# If you use any env files in production, COPY them too
# COPY .env .env

EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "run", "start:prod"]

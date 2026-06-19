# === STAGE 1: Build the Applicatin ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Install all development dependencies so Vitest and Vite can run builds
RUN npm install

# Copy the rest of the source code files
COPY . .

# Build the static asset build files into the /app/dist folder
RUN npm run build


# === STAGE 2: Serve the Static Build via Nginx ===
FROM nginx:1.25-alpine

# Copy our custom built web pages directly from Stage 1 into Nginx's HTML server
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx's default network hosting port)
EXPOSE 80

# Launch Nginx in the foreground so the container stays active continuously
CMD ["nginx", "-g", "daemon off;"]

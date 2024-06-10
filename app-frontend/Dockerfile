FROM node:13.10.1-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

COPY . .
RUN npm install
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Use the official stable version of Nginx with Alpine Linux as the base image
FROM nginx:stable-alpine

# Set the working directory for Nginx configuration files
WORKDIR /etc/nginx/conf.d

# Copy the custom Nginx configuration file to the container
COPY nginx/default.conf .

# Rename the copied configuration file (this step seems redundant, but it's kept if needed for future adjustments)
RUN mv default.conf default.conf

# Set the working directory for the web application files
WORKDIR /var/www/html

# Copy the application code from the local directory to the container
COPY app-backend .

# Use the official PHP 8.2 FPM image with Alpine Linux as the base image
FROM php:8.2-fpm-alpine

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the application code from the local directory to the container
COPY app-backend .

# Install necessary PHP extensions and dependencies
RUN apk add --no-cache mysql-client msmtp perl wget procps shadow libzip libpng libjpeg-turbo libwebp freetype icu

# Install build dependencies and PHP extensions
RUN apk add --no-cache --virtual build-essentials \
    icu-dev icu-libs zlib-dev g++ make automake autoconf libzip-dev \
    libpng-dev libwebp-dev libjpeg-turbo-dev freetype-dev && \
    # Configure and install GD library with support for various image formats
    docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install gd && \
    # Install additional PHP extensions
    docker-php-ext-install mysqli && \
    docker-php-ext-install pdo_mysql && \
    docker-php-ext-install intl && \
    docker-php-ext-install bcmath && \
    docker-php-ext-install opcache && \
    docker-php-ext-install exif && \
    docker-php-ext-install zip && \
    # Clean up build dependencies to reduce image size
    apk del build-essentials && rm -rf /usr/src/php*

# Install and enable the Redis extension
RUN apk add --no-cache pcre-dev $PHPIZE_DEPS \
    && pecl install redis \
    && docker-php-ext-enable redis.so

# Add a new user and group for deployment purposes
RUN addgroup -g 1000 deployer && adduser -G deployer -g deployer -s /bin/sh -D deployer

# Change ownership of the working directory to the new user
RUN chown -R deployer:deployer /var/www/html

# Switch to the new user
USER deployer

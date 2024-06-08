# Use the latest official Composer image as the base image
FROM composer:latest

# Add a new group and user for running the Composer commands
RUN addgroup -g 1000 deployer && \
    adduser -G deployer -g deployer -s /bin/sh -D deployer

# Switch to the new user
USER deployer

# Set the working directory inside the container
WORKDIR /var/www/html

# Set the entrypoint to run Composer with the specified argument by default
ENTRYPOINT [ "composer", "--ignore-platform-reqs" ]

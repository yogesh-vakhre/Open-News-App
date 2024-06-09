# Open News App

## Docker Compose - React, Laravel, MySQL, PhpMyAdmin

A boilerplate project to quickly set up a development environment with React, Laravel, MySQL, and PhpMyAdmin using Docker Compose.

## Project Structure

### Frontend

- **NodeJS**: 13.10.1 Alpine
- **React**: 16.13.0
- **Webpack**: 4

### Backend

- **PHP**: 8.2 FPM Alpine
- **Laravel**: 8
- **Composer**: latest

### Database and Tools

- **MySQL**: 8.0.1
- **PhpMyAdmin**

## Getting Started

Follow these steps to build and run the project using Docker Compose.

### Step 1: Build and Run Containers

Execute the following command to build and run the containers:
```bash
docker-compose up -d --build
```

### Step 2: Install Composer Dependencies

Run this command to install the required Composer dependencies:
```bash
docker-compose run --rm composer install
```

### Step 3: Generate Laravel Application Key

Generate the Laravel application key with the following command:
```bash
docker-compose run --rm artisan key:generate
```

### Step 4: Generate Laravel Application migrattion

Generate the Laravel application migrate with the following command:
```bash
docker-compose run --rm artisan migrate
```

## Accessing the Services

Once the containers are up and running, you can access the different services through the following URLs:

- **Backend (Laravel)**: [http://localhost:8080/](http://localhost:8080/)
- **Frontend (React)**: [http://localhost:8891/](http://localhost:8891/)
- **PhpMyAdmin**: [http://localhost:8892/](http://localhost:8892/)

## Additional Notes

- Ensure that you have Docker and Docker Compose installed on your machine.
- The ports used (8080 for backend, 8891 for frontend, and 8892 for PhpMyAdmin) can be changed in the `docker-compose.yml` file if needed.
- If you encounter any issues, check the Docker logs for more details.

Feel free to start coding and customizing the project as per your requirements. Happy coding!
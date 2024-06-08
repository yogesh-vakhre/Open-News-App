# Open News Api

Develop a RESTful API using PHP and Laravel that allows users to book, view, and cancel healthcare appointments. The API should interact with a MySQL database to store and retrieve data.

## Installation

First clone this repository, install the dependencies, and setup your .env file.

```
cd backend/
composer install
cp .env.example .env
```

Setup database configuration in .env file on root directory.

```
DB_DATABASE=laravel_project
DB_USERNAME=root
DB_PASSWORD=
```

And run the initial run your application.

```
php artisan key:generate
php artisan migrate --seed
php artisan cache:clear
php artisan config:clear
```

And run the your laravel application. 

```
php artisan serve --port=8080
```

Open  bewlow your localhost server in broweser
```
http://127.0.0.1:8080/
```

Now you can login with following credential:

```
Email: admin@gmail.com
Password: 123456
```

if you face permissioan realated issue  in the your laravel application on Ubuntu or Centos oprating systeme then do this.

```
sudo chown -R deployer:www-data /var/www/html/{your-project-name}/;
find /var/www/html/{your-project-name} -type f -exec chmod 664 {} \;
find /var/www/html/{your-project-name} -type d -exec chmod 775 {} \;
chgrp -R www-data storage bootstrap/cache
chmod -R ug+rwx storage bootstrap/cache
```

<img src="https://github.com/kkamara/useful/blob/main/php-reactjs-boilerplate.png?raw=true" alt="php-reactjs-boilerplate.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/php-reactjs-boilerplate2.png?raw=true" alt="php-reactjs-boilerplate2.png" width=""/>

# PHP ReactJS Boilerplate [![API](https://github.com/kkamara/php-reactjs-boilerplate/actions/workflows/build.yml/badge.svg)](https://github.com/kkamara/php-reactjs-boilerplate/actions/workflows/build.yml)

(2021) A Laravel 12.x boilerplate with ReactJS 19 Redux SPA.

* [Using Postman?](#postman)

* [Installation](#installation)

* [Usage](#usage)

* [API Documentation](#api-documentation)

* [Feature Tests](#feature-tests)

* [Misc.](#misc)

* [Contributing](#contributing)

* [License](#license)

<a name="postman"></a>
## Using Postman?

[Get Postman HTTP client](https://www.postman.com/).

[Postman API Collection for PHP ReactJS Boilerplate](https://github.com/kkamara/php-reactjs-boilerplate/blob/main/database/php-reactjs-boilerplate.postman_collection.json).

[Postman API Environment for PHP ReactJS Boilerplate](https://github.com/kkamara/php-reactjs-boilerplate/blob/main/database/php-reactjs-boilerplate.postman_environment.json).

## Installation

* [XAMPP: Apache, MariaDB (MySQL alternative), and PHP](https://www.apachefriends.org/)
* If you find that the MariaDB XAMPP service fails to start (I get this on Windows) then install MySQL manually [here](https://dev.mysql.com/downloads/mysql/)
* [https://laravel.com/docs/12.x/installation](https://laravel.com/docs/12.x/installation)
* [https://laravel.com/docs/12.x/vite](https://laravel.com/docs/12.x/vite)

```bash
# Create our environment file.
cp .env.example .env
# Update database values in .env file.
# Install our app dependencies.
composer i
php artisan key:generate
# Before running the next command:
# Update your database details in .env
php artisan migrate --seed
```

#### Frontend Installation

```bash
npm install --global yarn
yarn install
yarn build
```

## Usage

```bash
php artisan serve --port=8000
# Website accessible at http://localhost:8000
```

## API Documentation

```bash
php artisan route:list
# output
...
POST       api/user ............................ login › API\UserController@login
GET|HEAD   api/user/authorize .................. API\UserController@authorizeUser
POST       api/user/register ................... API\UserController@register
...
```

View the API collection [here](https://documenter.getpostman.com/view/17125932/TzzAKvVe).

## Feature Tests

```bash
php artisan test --filter=API
```

View the feature test code [here](https://raw.githubusercontent.com/kkamara/php-reactjs-boilerplate/main/tests/Feature/API/UserTest.php).

## Misc.

[See ReactJS Native Mobile Boilerplate](https://github.com/kkamara/ReactJSNativeMobileBoilerplate).

[See Multi-Window Desktop App](https://github.com/kkamara/multi-window-desktop-app).

[See PHP Scraper](https://github.com/kkamara/php-scraper).

[See Users API Repository Design app](https://github.com/kkamara/users-api-repository-design).

[See Beauty Parlour Management System](https://github.com/kkamara/beauty-parlour-management-system).

[See Book Store Management System](https://github.com/kkamara/book-store-management-system).

[See Laravel 10 API 3](https://github.com/kkamara/laravel-10-api-3).

[See MRVL Desktop](https://github.com/kkamara/mrvl-desktop).

[See MRVL Web](https://github.com/kkamara/mrvl-web).

[See PHP Docker Skeleton](https://github.com/kkamara/php-docker-skeleton).

[See Python Docker Skeleton](https://github.com/kkamara/python-docker-skeleton).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)

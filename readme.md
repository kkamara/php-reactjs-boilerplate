<img src="https://github.com/kkamara/useful/blob/main/php-reactjs-boilerplate.png?raw=true" alt="php-reactjs-boilerplate.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/php-reactjs-boilerplate2.png?raw=true" alt="php-reactjs-boilerplate2.png" width=""/>

# PHP ReactJS Boilerplate [![API](https://github.com/kkamara/php-reactjs-boilerplate/actions/workflows/build.yml/badge.svg)](https://github.com/kkamara/php-reactjs-boilerplate/actions/workflows/build.yml)

(2021) A Laravel 13.x boilerplate with ReactJS 19 Redux SPA.

* [Using Postman?](#postman)

* [Installation](#installation)

* [Usage](#usage)

* [API Documentation](#api-documentation)

* [Feature Tests](#feature-tests)

* [Sending & Viewing Test Emails](#test-emails)

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
php artisan migrate:status --path=database/migrations/V1
php artisan migrate --path=database/migrations/V1 --seed
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
```

View the API collection [here](https://documenter.getpostman.com/view/17125932/TzzAKvVe).

## Feature Tests

```bash
php artisan test --filter=API
```

View the feature test code [here](https://raw.githubusercontent.com/kkamara/php-reactjs-boilerplate/main/tests/Feature/API/UserTest.php).

<a name="test-emails"></a>
## Sending & Viewing Test Emails

#### Requirements

- [Docker](https://www.docker.com)

```bash
docker run -p 8025:8025 -p 1025:1025 mailhog/mailhog
```

Ensure `MAIL_MAILER` setting in your `.env` file is set to `smtp`. After running the above command this app should now be able to connect to the Mailhog email server running through Docker.

## Misc.

* [See PHP ReactJS Boilerplate](https://github.com/kkamara/php-reactjs-boilerplate)

* [See ReactJS Native Mobile App Boilerplate](https://github.com/kkamara/ReactJSNativeMobileAppBoilerplate)

* [See MRVL Desktop](https://github.com/kkamara/mrvl-desktop)

* [See MRVL Web](https://github.com/kkamara/mrvl-web)

* [See PHP Docker Skeleton](https://github.com/kkamara/php-docker-skeleton)

* [See PHP Scraper](https://github.com/kkamara/php-scraper).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)

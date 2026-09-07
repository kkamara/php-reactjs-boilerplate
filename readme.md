<img src="https://raw.githubusercontent.com/kkamara/useful/refs/heads/main/php-react-boilerplate.png" alt="php-react-boilerplate.png" width=""/>

<img src="https://raw.githubusercontent.com/kkamara/useful/refs/heads/main/php-react-boilerplate2.png" alt="php-react-boilerplate2.png" width=""/>

# PHP React Boilerplate [![API](https://github.com/kkamara/php-react-boilerplate/actions/workflows/build.yml/badge.svg)](https://github.com/kkamara/php-react-boilerplate/actions/workflows/build.yml)

(03-Mar-2022) A Laravel 13.x boilerplate with React 19 Redux SPA.

* [Using Postman?](#postman)

* [Installation](#installation)

* [Usage](#usage)

* [API Documentation](#api-documentation)

* [Feature Tests](#feature-tests)

* [Sending & Viewing Test Emails](#test-emails)

* [Contributing](#contributing)

* [License](#license)

<a name="postman"></a>
## Using Postman?

[Get Postman HTTP client](https://www.postman.com/).

[Postman API Collection for PHP React Boilerplate](./database/php-react-boilerplate.postman_collection.json).

[Postman API Environment for PHP React Boilerplate](./database/php-react-boilerplate.postman_environment.json).

## Installation

* [PHP](https://herd.laravel.com)
* [Install a database of your choice](https://laravel.com/framework/docs/installation#databases-and-migrations)

```bash
# Create our environment file.
cp .env.example .env
# Update database values in .env file.
# Install our app dependencies.
composer i
php artisan key:generate
# Link storage/public to public/storage folder.
php artisan storage:link
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

## Feature Tests

```bash
php artisan test --filter=API
```

View the feature test code [here](./tests/Feature/API/V1/UserTest.php).

<a name="test-emails"></a>
## Sending & Viewing Test Emails

#### Requirements

- [Docker](https://www.docker.com)

```bash
docker run -p 8025:8025 -p 1025:1025 mailhog/mailhog
```

Ensure `MAIL_MAILER` setting in your `.env` file is set to `smtp`. After running the above command this app should now be able to connect to the Mailhog email server running through Docker.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)

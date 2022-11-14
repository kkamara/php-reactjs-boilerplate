# Laravel React Boilerplate

## Installation
* [https://laravel.com/docs/9.x/installation](https://laravel.com/docs/9.x/installation)
* [https://laravel.com/docs/9.x/mix#main-content](https://laravel.com/docs/9.x/mix#main-content)

```bash
cp .env.example .env
composer i
make dev && make backend-migrate
```
## Usage

* [https://github.com/kkamara/laravel-makefile](https://github.com/kkamara/laravel-makefile)
* [https://laravel.com/docs/9.x/sail#main-content](https://laravel.com/docs/9.x/sail#main-content)
## Api Documentation

```bash
php artisan route:list
# output
...
POST       api/user ............................ login › Api\UserController@login
GET|HEAD   api/user/authorize .................. Api\UserController@authorizeUser
POST       api/user/register ................... Api\UserController@register
...
```

View the api collection [here](https://documenter.getpostman.com/view/17125932/TzzAKvVe).

## Redis Queue

You can test the `/job` endpoint to invoke a job example you can then view at 

```bash
alias sail='vendor/bin/sail'
sail artisan queue:listen redis --queue stuff
# output
[2022-04-16 13:30:17][KttOLxAyP6mnsNGScDLbKAgvxpJ7M0AA] Processing: App\Jobs\TestJob
[2022-04-16 13:30:17][KttOLxAyP6mnsNGScDLbKAgvxpJ7M0AA] Processed:  App\Jobs\TestJob
```

## Unit Testing

```bash
alias sail='vendor/bin/sail'
sail artisan test --filter api
```

View the unit test code [here](https://raw.githubusercontent.com/kkamara/laravel-react-boilerplate/develop/tests/Unit/Api/UsersTest.php).

## Browser Testing

```bash
alias sail='vendor/bin/sail'
sail dusk
```

## Mail Server

You can test the `/mail` endpoint to send a test mail you can then view at `:8025/`.

![docker-mailhog3.png](https://raw.githubusercontent.com/kkamara/useful/main/docker-mailhog3.png)

Mail environment credentials are at [.env](https://raw.githubusercontent.com/kkamara/laravel-react-boilerplate/develop/.env.example).

The [mailhog](https://github.com/mailhog/MailHog) docker image runs at `http://localhost:8025`.

## Misc

[See todo app.](https://github.com/kkamara/todo-app)

[See ecommerce web.](https://github.com/kkamara/ecommerce-web)

[See crm.](https://github.com/kkamara/crm)

[See birthday currency.](https://github.com/kkamara/birthday-currency)

[See php scraper.](https://github.com/kkamara/php-scraper)

[See amazon scraper.](https://github.com/kkamara/amazon-scraper)

[See python amazon scraper.](https://github.com/kkamara/python-amazon-scraper)

[See wordpress with docker support.](https://github.com/kkamara/wordpress)

The `Makefile` for this project contains useful commands for a Laravel application and can be found at [laravel-makefile](https://github.com/kkamara/laravel-makefile).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)

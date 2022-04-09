# Laravel React Boilerplate

## Installation
* [https://laravel.com/docs/master/installation](https://laravel.com/docs/master/installation)
* [https://laravel.com/docs/master/mix](https://laravel.com/docs/master/mix)

```bash
cp .env.example .env
composer i
make dev && make backend-migrate
```
## Usage

* [https://github.com/kkamara/laravel-makefile](https://github.com/kkamara/laravel-makefile)
* [https://laravel.com/docs/9.x/sail#main-content](https://laravel.com/docs/9.x/sail#main-content)

## Browser Testing

```bash
  alias sail='vendor/bin/sail'
  sail dusk
```

## Mail Server

![docker-mailhog3.png](https://raw.githubusercontent.com/kkamara/useful/main/docker-mailhog3.png)

Mail environment credentials are at [.env](https://raw.githubusercontent.com/kkamara/laravel-react-boilerplate/develop/.env.example).

The [mailhog](https://github.com/mailhog/MailHog) docker image runs at `http://localhost:8025`.

## Misc

This project was made possible by  [jmkolawole](https://github.com/jmkolawole/laravel-react-fullstack-application-with-passport-redux-and-material-ui).

The `Makefile` for this project contains useful commands for a Laravel application and can be found at [laravel-makefile](https://github.com/kkamara/laravel-makefile).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)

# Lumen PHP Framework

[![Build Status](https://travis-ci.org/laravel/lumen-framework.svg)](https://travis-ci.org/laravel/lumen-framework)
[![Total Downloads](https://poser.pugx.org/laravel/lumen-framework/d/total.svg)](https://packagist.org/packages/laravel/lumen-framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/lumen-framework/v/stable.svg)](https://packagist.org/packages/laravel/lumen-framework)
[![License](https://poser.pugx.org/laravel/lumen-framework/license.svg)](https://packagist.org/packages/laravel/lumen-framework)

Laravel Lumen is a stunningly fast PHP micro-framework for building web applications with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Lumen attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as routing, database abstraction, queueing, and caching.

## Official Documentation

Documentation for the framework can be found on the [Lumen website](https://lumen.laravel.com/docs).

## Contributing

Thank you for considering contributing to Lumen! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Security Vulnerabilities

If you discover a security vulnerability within Lumen, please send an e-mail to Taylor Otwell at taylor@laravel.com. All security vulnerabilities will be promptly addressed.

## License

The Lumen framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## How to run project
### Run web service
1. create `.env` file from main dir.  You can copy from `.env.example`.
2. run your mysql local environment. Create the database, make sure the value its from `DB_DATABASE` key from your `.env` file
2. Fill all the DB_ prefix key value with your local environment
3. run your mysql local environment
3. run `php artisan migrate` to create migration
4. run `php artisan db:seed` to seed the user data on mysql
5. build frontend SERVICE from step 1 & 3 bellow on how to `Run frontend service`
5. run `php -S localhost:8000 -t public` on your terminal

### Run frontend service
1. install the dependencies first, use `npm i` on main dir
2. `npm run serve` to run web on development
3. `npm run build` to build project

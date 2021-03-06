<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function ($router) {
    $router->get('/users', 'UserController@all');
    $router->post('/users', 'UserController@create');
    $router->post('/users/login', 'UserController@login');
});

$router->get('/{route:.*}/', function () {
    return view('index');
});

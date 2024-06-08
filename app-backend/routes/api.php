<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::resource('users', 'App\Http\Controllers\UserController');
    Route::post('/auth/logout', 'App\Http\Controllers\AuthController@logout');
    Route::get('/auth/user', 'App\Http\Controllers\AuthController@me');
    Route::patch('/auth/update-preference', 'App\Http\Controllers\AuthController@updatePreference');

    Route::get('/newsapi/top-headlines', 'App\Http\Controllers\NewsController@topHeadlines');
    Route::get('/newsapi/everything', 'App\Http\Controllers\NewsController@everything');

    Route::get('/guardianapi/articles', 'App\Http\Controllers\GuardianController@getArticles');
    Route::get('/guardianapi/get-categories', 'App\Http\Controllers\GuardianController@getCategories');

    Route::get('/nytimesapi/articles', 'App\Http\Controllers\NytimesController@getArticles');

});



Route::post('/auth/register', 'App\Http\Controllers\AuthController@register');
Route::post('/auth/login', 'App\Http\Controllers\AuthController@login');

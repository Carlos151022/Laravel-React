<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;

// Route::middleware('auth:santum')->get('/user',function (Request $request){
//     return $request->user();
// });

Route::controller(ProductController::class)->group(function (){
    Route::get('/products','index');
    Route::post('/product','store');
    Route::get('/product/{id}','show');
    Route::put('/product/{id}','update');
    Route::delete('/product/{id}','destroy');
});

Route::get('/', function () {
    return view('welcome');
});

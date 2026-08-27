<?php

use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// A U T H E N T I F I C A T I O N
Route::prefix('auth')->controller(AuthentificationController::class)->group(function () {
    Route::get('', 'auth')->middleware('auth');
    Route::get('verified', 'verified')->middleware(['auth', 'verified']);
    Route::post('logout', 'logout')->middleware('auth', 'verified');
    Route::post('login', 'login');
    Route::post('change-password', 'changePassword')->middleware('auth', 'verified');
    Route::post('forgot-password', 'forgotPassword');
    Route::post('reset-password', 'resetPassword');
});

// P R O F I L E
Route::prefix('profile')->controller(ProfileController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('resend-register-confirmation-email', 'resendRegisterConfirmationEmail')->middleware('auth');
});

<?php

namespace App\Infrastructure\Services;

use App\Application\Services\IPasswordService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class LaravelPasswordService implements IPasswordService
{
    public function sendResetLink(string $email): void
    {
       Password::sendResetLink(['email' => $email]);
    }

    public function reset(string $email, string $password, string $token): void
    {
        Password::reset(
            ['email' => $email, 'password' => $password, 'token' => $token],
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );
    }
}
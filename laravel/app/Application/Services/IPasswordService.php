<?php

namespace App\Application\Services;

interface IPasswordService
{
    public function sendResetLink(string $email): void;

    public function reset(string $email, string $password, string $token): void;

}
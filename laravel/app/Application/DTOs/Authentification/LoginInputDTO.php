<?php

namespace App\Application\DTOs\Authentification;

class LoginInputDTO
{
    public function __construct(
        public string $email,
        public string $password,
    ) 
    {}
}
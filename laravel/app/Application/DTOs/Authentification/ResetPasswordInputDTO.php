<?php

namespace App\Application\DTOs\Authentification;

class ResetPasswordInputDTO
{
    public function __construct(
        public string $email,
        public string $password,
        public string $token
    ) 
    {}

    public static function fromArray(array $data): self
    {
        return new self(
            email: $data['email'],
            password: $data['password'],
            token: $data['token']
        );
    }
}
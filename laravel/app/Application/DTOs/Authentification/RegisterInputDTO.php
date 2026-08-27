<?php

namespace App\Application\DTOs\Authentification;

class RegisterInputDTO
{

    public function __construct(
        public string $nom,
        public string $prenom,
        public string $email,
        public string $password,
    )
    {}

}
<?php

namespace App\Application\DTOs\Authentification;

use App\Application\DTOs\Profile\ProfileOutputDTO;

class RegisterOutputDTO
{

    public function __construct(
        public ProfileOutputDTO $profile,
        public string $token,
    )
    {}

}
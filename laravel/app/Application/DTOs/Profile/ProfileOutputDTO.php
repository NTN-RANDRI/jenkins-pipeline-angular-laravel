<?php

namespace App\Application\DTOs\Profile;

class ProfileOutputDTO
{

    public function __construct(
        public int $id,
        public string $nom,
        public string $prenom,
        public string $email,
    )
    {}

}
<?php

namespace App\Http\Mappers;

use App\Application\DTOs\Authentification\RegisterInputDTO;

class RegisterRequestMapper
{

    public static function toInputDTO(array $data): RegisterInputDTO
    {
        $registerInput = new RegisterInputDTO(
            $data['nom'],
            $data['prenom'],
            $data['email'],
            $data['password'],
        );

        return $registerInput;
    }

}
<?php

namespace App\Http\Mappers;

use App\Application\DTOs\Authentification\LoginInputDTO;

class LoginRequestMapper
{

    public static function toInputDTO(array $data): LoginInputDTO
    {
        $loginInput = new LoginInputDTO(
            $data['email'],
            $data['password'],
        );

        return $loginInput;
    }

}
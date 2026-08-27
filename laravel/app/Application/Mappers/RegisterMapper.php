<?php

namespace App\Application\Mappers;

use App\Application\DTOs\Authentification\RegisterInputDTO;
use App\Application\DTOs\Authentification\RegisterOutputDTO;
use App\Domain\Entities\ProfileEntity;

class RegisterMapper
{

    public static function toProfileEntity(RegisterInputDTO $registerInput): ProfileEntity
    {
        $profileEntity = new ProfileEntity(
            null,
            $registerInput->nom,
            $registerInput->prenom,
            $registerInput->email
        );

        return $profileEntity;
    }

    public static function toOutputDTO(string $token, ProfileEntity $profileEntity): RegisterOutputDTO
    {
        $profileOutput = ProfileMapper::toOutputDTO($profileEntity);

        $registerOutput = new RegisterOutputDTO(
            $profileOutput,
            $token
        );

        return $registerOutput;
    }

}
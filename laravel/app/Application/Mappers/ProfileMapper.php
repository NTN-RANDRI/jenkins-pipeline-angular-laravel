<?php

namespace App\Application\Mappers;

use App\Application\DTOs\Profile\ProfileOutputDTO;
use App\Domain\Entities\ProfileEntity;

class ProfileMapper
{

    public static function toOutputDTO(ProfileEntity $profileEntity): ProfileOutputDTO 
    {
        $profileOutput = new ProfileOutputDTO(
            $profileEntity->getId(),
            $profileEntity->getNom(),
            $profileEntity->getPrenom(),
            $profileEntity->getEmail()
        );

        return $profileOutput;
    }

}
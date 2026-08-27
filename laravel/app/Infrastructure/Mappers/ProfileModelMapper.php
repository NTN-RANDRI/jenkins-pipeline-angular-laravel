<?php

namespace App\Infrastructure\Mappers;

use App\Domain\Entities\ProfileEntity;
use App\Models\User;

class ProfileModelMapper
{

    public static function toDomain(User $user): ProfileEntity
    {
        $profileEntity = new ProfileEntity(
            $user->id,
            $user->nom,
            $user->prenom,
            $user->email
        );

        return $profileEntity;
    }

}
<?php

namespace App\Infrastructure\Services;

use App\Application\Services\IAuthService;
use App\Domain\Entities\ProfileEntity;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Override;

class LaravelAuthService implements IAuthService
{

    public function login(ProfileEntity $profileEntity, bool $remember = false): void
    {
        $user = User::findOrFail($profileEntity->getId());

        Auth::login($user, $remember);
    }

    public function logout(): void
    {
        Auth::logout();
    }

    public function profile(): ?ProfileEntity
    {
        $user = Auth::user();

        if (!$user) {
            return null;
        }

        $profileEntity = new ProfileEntity(
            $user->id,
            $user->nom,
            $user->prenom,
            $user->email
        );

        return $profileEntity;
    }

    public function profileVerified(): ?ProfileEntity
    {
        $user = Auth::user();

        if (!$user || !$user->hasVerifiedEmail()) {
            return null;
        }

        $profileEntity = new ProfileEntity(
            $user->id,
            $user->nom,
            $user->prenom,
            $user->email
        );

        return $profileEntity;
    }

}
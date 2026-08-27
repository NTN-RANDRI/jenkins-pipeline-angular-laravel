<?php

namespace App\Application\Services;

use App\Domain\Entities\ProfileEntity;

interface IAuthService
{

    public function login(ProfileEntity $profileEntity, bool $remember = false): void;

    public function logout(): void;

    public function profile(): ?ProfileEntity;

    public function profileVerified(): ?ProfileEntity;

}
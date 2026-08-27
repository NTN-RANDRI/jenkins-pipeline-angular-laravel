<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\ProfileEntity;

interface IProfileRepository
{

    public function isEmailExists(string $email, ?int $ignoreId = null): bool;
    public function register(ProfileEntity $profileEntity, string $password): ProfileEntity;

    public function findByEmail(string $email): ?ProfileEntity;

    public function checkPassword(int $id, string $password): bool;

    public function changePassword(int $id, string $newHashPassword): void;

}
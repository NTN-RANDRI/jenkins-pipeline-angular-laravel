<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\ProfileEntity;
use App\Domain\Repositories\IProfileRepository;
use App\Infrastructure\Mappers\ProfileModelMapper;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Override;

class ProfileRepository implements IProfileRepository
{

    public function isEmailExists(string $email, ?int $ignoreId = null): bool
    {
        $query = User::where('email', $email);

        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        $exists = $query->exists();

        return $exists;
    }

    public function register(ProfileEntity $profileEntity, string $password): ProfileEntity
    {
        $user = User::create([
            'nom' => $profileEntity->getNom(),
            'prenom' => $profileEntity->getPrenom(),
            'email' => $profileEntity->getEmail(),
            'password' => Hash::make($password),
        ]);

        $profileEntity = ProfileModelMapper::toDomain($user);

        return $profileEntity;
    }

    public function findByEmail(string $email): ?ProfileEntity
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return null;
        }

        $profileEntity = ProfileModelMapper::toDomain($user);

        return $profileEntity;
    }

    public function getPasswordHashByEmail(string $email): ?string
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return null;
        }

        return $user->password;
    }

    public function checkPassword(int $id, string $password): bool
    {
        $user = User::findOrFail($id);

        $isPasswordValid = Hash::check($password, $user->password);

        return $isPasswordValid;
    }

    public function changePassword(int $id, string $newPassword): void
    {
        $user = User::findOrFail($id);
        $user->password = Hash::make($newPassword);
        $user->save();
    }

}
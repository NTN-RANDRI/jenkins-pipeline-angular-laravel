<?php

namespace App\Application\UseCases\Authentification;

use App\Application\Exceptions\InvalidPasswordException;
use App\Application\Services\IAuthService;
use App\Domain\Repositories\IProfileRepository;

class ChangePassword
{

    public function __construct(
        private IAuthService $authService,
        private IProfileRepository $profileRepo,
    )
    {}

    public function execute(string $currentPassword, string $newPassword): void
    {
        $profileEntity = $this->authService->profile();

        $isPasswordValid = $this->profileRepo->checkPassword($profileEntity->getId(), $currentPassword);

        if (!$isPasswordValid) {
            throw new InvalidPasswordException();
        }

        $this->profileRepo->changePassword($profileEntity->getId(), $newPassword);
    }

}
<?php

namespace App\Application\UseCases\Authentification;

use App\Application\Services\IPasswordService;
use App\Domain\Repositories\IProfileRepository;

class ForgotPassword
{

    public function __construct(
        private IProfileRepository $profileRepository,
        private IPasswordService $passwordService
    )
    {}

    public function execute(string $email): void
    {
        $profileEntity = $this->profileRepository->findByEmail($email);

        if (!$profileEntity) {
            throw new \Exception('Profile not found');
        }

        $this->passwordService->sendResetLink($email);
    }

}
<?php

namespace App\Application\UseCases\Authentification;

use App\Application\DTOs\Authentification\LoginInputDTO;
use App\Application\Exceptions\InvalidCredentialsException;
use App\Application\Services\IAuthService;
use App\Domain\Repositories\IProfileRepository;
use Illuminate\Support\Facades\Hash;

class Login
{
    public function __construct(
        private IAuthService $authService,
        private IProfileRepository $profileRepo,
    ) 
    {}

    public function execute(LoginInputDTO $loginInput): void
    {
        $profileEntity = $this->profileRepo->findByEmail($loginInput->email);

        if (!$profileEntity) {
            throw new InvalidCredentialsException();
        }

        $isPasswordValid = $this->profileRepo->checkPassword($profileEntity->getId(), $loginInput->password);

        if (!$isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        $this->authService->login($profileEntity);
    }
}
<?php

namespace App\Application\UseCases\Authentification;

use App\Application\Services\IAuthService;

class Logout
{
    public function __construct(
        private IAuthService $authService,
    )
    {}

    public function execute(): void
    {
        $this->authService->logout();
    }
}
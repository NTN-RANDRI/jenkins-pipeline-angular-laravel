<?php

namespace App\Application\UseCases\Authentification;

use App\Application\DTOs\Authentification\ResetPasswordInputDTO;
use App\Application\Services\IPasswordService;

class ResetPassword
{

    public function __construct(
        private IPasswordService $passwordService
    ) 
    {}

    public function execute(ResetPasswordInputDTO $resetPasswordInput): void
    {
        $this->passwordService->reset($resetPasswordInput->email, $resetPasswordInput->password, $resetPasswordInput->token);
    }

}
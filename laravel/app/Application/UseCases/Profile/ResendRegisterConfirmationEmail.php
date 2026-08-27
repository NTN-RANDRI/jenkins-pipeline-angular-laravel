<?php

namespace App\Application\UseCases\Profile;

use App\Application\Services\IAuthService;
use App\Application\Services\IEmailService;
use App\Mail\RegisterConfirmationMail;
use Illuminate\Support\Facades\URL;

class ResendRegisterConfirmationEmail
{

    public function __construct(
        private IAuthService $authService,
        private IEmailService $emailService,
    )
    {}

    public function execute(): void
    {
        $profileEntity = $this->authService->profile();

        $url = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinute(60),
            [
                'id' => $profileEntity->getId(),
                'hash' => sha1($profileEntity->getEmail())
            ]
        );

        $this->emailService->send(new RegisterConfirmationMail($profileEntity, $url));
    }

}
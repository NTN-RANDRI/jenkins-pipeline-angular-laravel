<?php

namespace App\Application\UseCases\Profile;

use App\Application\DTOs\Authentification\RegisterInputDTO;
use App\Application\DTOs\Profile\ProfileOutputDTO;
use App\Application\Exceptions\EmailAlreadyTakenException;
use App\Application\Mappers\ProfileMapper;
use App\Application\Mappers\RegisterMapper;
use App\Application\Services\IAuthService;
use App\Application\Services\IEmailService;
use App\Domain\Repositories\IProfileRepository;
use App\Mail\RegisterConfirmationMail;
use Illuminate\Support\Facades\URL;

class Register
{

    public function __construct(
        private IProfileRepository $profileRepo,
        private IEmailService $emailService,
        private IAuthService $authService,
    )
    {}

    public function execute(RegisterInputDTO $registerInput): ProfileOutputDTO
    {
        $this->businessRule($registerInput->email);

        $profileEntity = RegisterMapper::toProfileEntity($registerInput);
        
        $profileEntity = $this->profileRepo->register($profileEntity, $registerInput->password);

        $this->authService->login($profileEntity);

        $url = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinute(60),
            [
                'id' => $profileEntity->getId(),
                'hash' => sha1($profileEntity->getEmail())
            ]
        );

        $this->emailService->send(new RegisterConfirmationMail($profileEntity, $url));

        $profileOutput = ProfileMapper::toOutputDTO($profileEntity);

        return $profileOutput;
    }

    public function businessRule(string $email): void
    {
        $isEmailExists = $this->profileRepo->isEmailExists($email);

        if ($isEmailExists) {
            throw new EmailAlreadyTakenException();
        }
    }

}
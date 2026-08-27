<?php

namespace App\Application\UseCases\Authentification;

use App\Application\DTOs\Profile\ProfileOutputDTO;
use App\Application\Mappers\ProfileMapper;
use App\Application\Services\IAuthService;

class AuthVerified
{

    public function __construct(
        private IAuthService $authService,
    )
    {}

    public function execute(): ProfileOutputDTO
    {
        $profileEntity = $this->authService->profileVerified();

        $profileOutput = ProfileMapper::toOutputDTO($profileEntity);

        return $profileOutput;
    }

}
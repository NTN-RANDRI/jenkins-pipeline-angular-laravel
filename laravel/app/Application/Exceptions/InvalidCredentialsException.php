<?php

namespace App\Application\Exceptions;

class InvalidCredentialsException extends BusinessException
{

    public function __construct()
    {
        parent::__construct(
            'Identifiants invalides',
            401,
            [
                'credentials' => [
                    'Email ou mot de passe incorrect',
                ],
            ],
        );
    }

}
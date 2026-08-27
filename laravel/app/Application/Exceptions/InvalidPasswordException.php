<?php

namespace App\Application\Exceptions;

class InvalidPasswordException extends BusinessException
{

    public function __construct()
    {
        parent::__construct(
            'Mot de passe invalide.',
            401,
            [
                'password' => [
                    'Le mot de passe actuel est incorrect.',
                ],
            ],
        );
    }

}
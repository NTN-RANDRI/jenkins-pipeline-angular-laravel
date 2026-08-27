<?php

namespace App\Application\Exceptions;

class EmailAlreadyTakenException extends BusinessException
{

    public function __construct()
    {
        parent::__construct(
            'Email déja utilisé',
            409,
            [
                'email' => [
                    'Adresse email déja utilisé',
                ],
            ],
        );
    }

}
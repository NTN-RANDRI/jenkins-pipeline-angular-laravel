<?php

namespace App\Application\Exceptions;

use DomainException;

abstract class BusinessException extends DomainException
{

    protected array $errors;

    public function __construct(
        string $message = '',
        int $code = 400,
        array $errors = [],
    )
    {
        $this->code = $code;
        parent::__construct($message, $this->code);

        $this->errors = $errors;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

}
<?php

namespace App\Application\DTOs\Todo;

class CreateTodoInputDTO
{
    public function __construct(
        public int $userId,
        public string $title,
        public string $priority = 'medium',
    ) {}
}

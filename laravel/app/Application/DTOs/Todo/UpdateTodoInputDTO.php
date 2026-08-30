<?php

namespace App\Application\DTOs\Todo;

class UpdateTodoInputDTO
{
    public function __construct(
        public int $id,
        public int $userId,
        public ?string $title = null,
        public ?bool $completed = null,
        public ?string $priority = null,
    ) {}
}

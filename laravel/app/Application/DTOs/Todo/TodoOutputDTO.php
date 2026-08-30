<?php

namespace App\Application\DTOs\Todo;

use JsonSerializable;

class TodoOutputDTO implements JsonSerializable
{
    public function __construct(
        public int $id,
        public int $userId,
        public string $title,
        public bool $completed,
        public string $priority,
        public ?string $createdAt = null,
        public ?string $updatedAt = null,
    ) {}

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->userId,
            'title' => $this->title,
            'completed' => $this->completed,
            'priority' => $this->priority,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
        ];
    }
}

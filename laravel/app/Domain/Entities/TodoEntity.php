<?php

namespace App\Domain\Entities;

use DateTimeInterface;

class TodoEntity
{
    public function __construct(
        private ?int $id,
        private int $userId,
        private string $title,
        private bool $completed = false,
        private string $priority = 'medium',
        private ?DateTimeInterface $createdAt = null,
        private ?DateTimeInterface $updatedAt = null,
    ) {}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function isCompleted(): bool
    {
        return $this->completed;
    }

    public function getPriority(): string
    {
        return $this->priority;
    }

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setCompleted(bool $completed): void
    {
        $this->completed = $completed;
    }

    public function setPriority(string $priority): void
    {
        $this->priority = $priority;
    }
}

<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\TodoEntity;

interface ITodoRepository
{
    /**
     * @return TodoEntity[]
     */
    public function getAllByUserId(int $userId): array;

    public function findByIdAndUserId(int $id, int $userId): ?TodoEntity;

    public function create(TodoEntity $todoEntity): TodoEntity;

    public function update(TodoEntity $todoEntity): TodoEntity;

    public function delete(int $id, int $userId): bool;

    public function clearCompleted(int $userId): void;
}

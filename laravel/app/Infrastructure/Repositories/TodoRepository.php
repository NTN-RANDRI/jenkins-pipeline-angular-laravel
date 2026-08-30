<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\TodoEntity;
use App\Domain\Repositories\ITodoRepository;
use App\Infrastructure\Mappers\TodoModelMapper;
use App\Models\Todo;

class TodoRepository implements ITodoRepository
{
    /**
     * @return TodoEntity[]
     */
    public function getAllByUserId(int $userId): array
    {
        $todos = Todo::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return $todos->map(fn (Todo $todo) => TodoModelMapper::toDomain($todo))->all();
    }

    public function findByIdAndUserId(int $id, int $userId): ?TodoEntity
    {
        $todo = Todo::where('id', $id)->where('user_id', $userId)->first();

        if (!$todo) {
            return null;
        }

        return TodoModelMapper::toDomain($todo);
    }

    public function create(TodoEntity $todoEntity): TodoEntity
    {
        $todo = Todo::create([
            'user_id' => $todoEntity->getUserId(),
            'title' => $todoEntity->getTitle(),
            'completed' => $todoEntity->isCompleted(),
            'priority' => $todoEntity->getPriority(),
        ]);

        return TodoModelMapper::toDomain($todo);
    }

    public function update(TodoEntity $todoEntity): TodoEntity
    {
        $todo = Todo::where('id', $todoEntity->getId())
            ->where('user_id', $todoEntity->getUserId())
            ->firstOrFail();

        $todo->update([
            'title' => $todoEntity->getTitle(),
            'completed' => $todoEntity->isCompleted(),
            'priority' => $todoEntity->getPriority(),
        ]);

        return TodoModelMapper::toDomain($todo);
    }

    public function delete(int $id, int $userId): bool
    {
        return (bool) Todo::where('id', $id)->where('user_id', $userId)->delete();
    }

    public function clearCompleted(int $userId): void
    {
        Todo::where('user_id', $userId)->where('completed', true)->delete();
    }
}

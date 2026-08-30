<?php

namespace App\Http\Mappers;

use App\Application\DTOs\Todo\CreateTodoInputDTO;
use App\Application\DTOs\Todo\UpdateTodoInputDTO;

class TodoRequestMapper
{
    public static function toCreateInputDTO(array $data, int $userId): CreateTodoInputDTO
    {
        return new CreateTodoInputDTO(
            userId: $userId,
            title: $data['title'],
            priority: $data['priority'] ?? 'medium',
        );
    }

    public static function toUpdateInputDTO(int $id, array $data, int $userId): UpdateTodoInputDTO
    {
        return new UpdateTodoInputDTO(
            id: $id,
            userId: $userId,
            title: $data['title'] ?? null,
            completed: isset($data['completed']) ? (bool) $data['completed'] : null,
            priority: $data['priority'] ?? null,
        );
    }
}

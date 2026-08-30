<?php

namespace App\Infrastructure\Mappers;

use App\Domain\Entities\TodoEntity;
use App\Models\Todo;

class TodoModelMapper
{
    public static function toDomain(Todo $model): TodoEntity
    {
        return new TodoEntity(
            $model->id,
            $model->user_id,
            $model->title,
            (bool) $model->completed,
            $model->priority,
            $model->created_at,
            $model->updated_at
        );
    }
}

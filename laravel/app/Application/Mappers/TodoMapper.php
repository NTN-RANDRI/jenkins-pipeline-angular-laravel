<?php

namespace App\Application\Mappers;

use App\Application\DTOs\Todo\TodoOutputDTO;
use App\Domain\Entities\TodoEntity;

class TodoMapper
{
    public static function toOutputDTO(TodoEntity $todoEntity): TodoOutputDTO
    {
        return new TodoOutputDTO(
            id: (int) $todoEntity->getId(),
            userId: $todoEntity->getUserId(),
            title: $todoEntity->getTitle(),
            completed: $todoEntity->isCompleted(),
            priority: $todoEntity->getPriority(),
            createdAt: $todoEntity->getCreatedAt()?->format('Y-m-d H:i:s'),
            updatedAt: $todoEntity->getUpdatedAt()?->format('Y-m-d H:i:s')
        );
    }

    /**
     * @param TodoEntity[] $todoEntities
     * @return TodoOutputDTO[]
     */
    public static function toOutputDTOList(array $todoEntities): array
    {
        return array_map(fn (TodoEntity $entity) => self::toOutputDTO($entity), $todoEntities);
    }
}

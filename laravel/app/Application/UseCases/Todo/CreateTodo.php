<?php

namespace App\Application\UseCases\Todo;

use App\Application\DTOs\Todo\CreateTodoInputDTO;
use App\Application\DTOs\Todo\TodoOutputDTO;
use App\Application\Mappers\TodoMapper;
use App\Domain\Entities\TodoEntity;
use App\Domain\Repositories\ITodoRepository;

class CreateTodo
{
    public function __construct(
        private ITodoRepository $todoRepository,
    ) {}

    public function execute(CreateTodoInputDTO $input): TodoOutputDTO
    {
        $entity = new TodoEntity(
            id: null,
            userId: $input->userId,
            title: $input->title,
            completed: false,
            priority: $input->priority ?? 'medium'
        );

        $savedEntity = $this->todoRepository->create($entity);

        return TodoMapper::toOutputDTO($savedEntity);
    }
}

<?php

namespace App\Application\UseCases\Todo;

use App\Application\DTOs\Todo\TodoOutputDTO;
use App\Application\DTOs\Todo\UpdateTodoInputDTO;
use App\Application\Mappers\TodoMapper;
use App\Domain\Repositories\ITodoRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateTodo
{
    public function __construct(
        private ITodoRepository $todoRepository,
    ) {}

    public function execute(UpdateTodoInputDTO $input): TodoOutputDTO
    {
        $entity = $this->todoRepository->findByIdAndUserId($input->id, $input->userId);

        if (!$entity) {
            throw new NotFoundHttpException('Tâche non trouvée');
        }

        if ($input->title !== null) {
            $entity->setTitle($input->title);
        }

        if ($input->completed !== null) {
            $entity->setCompleted($input->completed);
        }

        if ($input->priority !== null) {
            $entity->setPriority($input->priority);
        }

        $updatedEntity = $this->todoRepository->update($entity);

        return TodoMapper::toOutputDTO($updatedEntity);
    }
}

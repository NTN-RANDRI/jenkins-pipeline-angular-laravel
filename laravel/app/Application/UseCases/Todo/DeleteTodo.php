<?php

namespace App\Application\UseCases\Todo;

use App\Domain\Repositories\ITodoRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteTodo
{
    public function __construct(
        private ITodoRepository $todoRepository,
    ) {}

    public function execute(int $id, int $userId): void
    {
        $entity = $this->todoRepository->findByIdAndUserId($id, $userId);

        if (!$entity) {
            throw new NotFoundHttpException('Tâche non trouvée');
        }

        $this->todoRepository->delete($id, $userId);
    }
}

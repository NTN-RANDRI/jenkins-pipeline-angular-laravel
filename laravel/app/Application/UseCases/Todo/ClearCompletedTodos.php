<?php

namespace App\Application\UseCases\Todo;

use App\Domain\Repositories\ITodoRepository;

class ClearCompletedTodos
{
    public function __construct(
        private ITodoRepository $todoRepository,
    ) {}

    public function execute(int $userId): void
    {
        $this->todoRepository->clearCompleted($userId);
    }
}

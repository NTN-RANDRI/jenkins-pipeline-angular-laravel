<?php

namespace App\Application\UseCases\Todo;

use App\Application\DTOs\Todo\TodoOutputDTO;
use App\Application\Mappers\TodoMapper;
use App\Domain\Repositories\ITodoRepository;

class GetTodos
{
    public function __construct(
        private ITodoRepository $todoRepository,
    ) {}

    /**
     * @return TodoOutputDTO[]
     */
    public function execute(int $userId): array
    {
        $entities = $this->todoRepository->getAllByUserId($userId);

        return TodoMapper::toOutputDTOList($entities);
    }
}

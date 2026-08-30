<?php

namespace App\Http\Controllers;

use App\Application\UseCases\Todo\ClearCompletedTodos;
use App\Application\UseCases\Todo\CreateTodo;
use App\Application\UseCases\Todo\DeleteTodo;
use App\Application\UseCases\Todo\GetTodos;
use App\Application\UseCases\Todo\UpdateTodo;
use App\Http\Mappers\TodoRequestMapper;
use App\Http\Requests\Todo\CreateTodoRequest;
use App\Http\Requests\Todo\UpdateTodoRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function __construct(
        private GetTodos $getTodos,
        private CreateTodo $createTodo,
        private UpdateTodo $updateTodo,
        private DeleteTodo $deleteTodo,
        private ClearCompletedTodos $clearCompletedTodos,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $todos = $this->getTodos->execute($userId);

        return response()->json($todos);
    }

    public function store(CreateTodoRequest $request): JsonResponse
    {
        $userId = $request->user()->id;
        $input = TodoRequestMapper::toCreateInputDTO($request->validated(), $userId);
        $todo = $this->createTodo->execute($input);

        return response()->json($todo, 201);
    }

    public function update(int $id, UpdateTodoRequest $request): JsonResponse
    {
        $userId = $request->user()->id;
        $input = TodoRequestMapper::toUpdateInputDTO($id, $request->validated(), $userId);
        $todo = $this->updateTodo->execute($input);

        return response()->json($todo);
    }

    public function destroy(int $id, Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $this->deleteTodo->execute($id, $userId);

        return response()->json(['message' => 'Tâche supprimée avec succès']);
    }

    public function clearCompleted(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $this->clearCompletedTodos->execute($userId);

        return response()->json(['message' => 'Tâches terminées supprimées avec succès']);
    }
}

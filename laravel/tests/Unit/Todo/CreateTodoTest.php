<?php

namespace Tests\Unit\Todo;

use App\Application\DTOs\Todo\CreateTodoInputDTO;
use App\Application\UseCases\Todo\CreateTodo;
use App\Infrastructure\Repositories\TodoRepository;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CreateTodoTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function create_todo(): void
    {
        $user = User::create([
            'nom' => 'Doe',
            'prenom' => 'John',
            'email' => 'john.doe@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);

        $repository = new TodoRepository();
        $useCase = new CreateTodo($repository);

        $result = $useCase->execute(new CreateTodoInputDTO(
            userId: $user->id,
            title: 'Faire les courses',
            priority: 'high',
        ));

        $this->assertSame($user->id, $result->userId);
        $this->assertSame('Faire les courses', $result->title);
        $this->assertFalse($result->completed);
        $this->assertSame('high', $result->priority);

        $savedTodo = Todo::query()->where('user_id', $user->id)->first();
        $this->assertNotNull($savedTodo);
        $this->assertSame('Faire les courses', $savedTodo->title);
        $this->assertFalse((bool) $savedTodo->completed);
        $this->assertSame('high', $savedTodo->priority);
    }
}

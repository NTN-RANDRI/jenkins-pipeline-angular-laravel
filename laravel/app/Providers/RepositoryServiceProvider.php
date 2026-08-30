<?php

namespace App\Providers;

use App\Domain\Repositories\IProfileRepository;
use App\Domain\Repositories\ITodoRepository;
use App\Infrastructure\Repositories\ProfileRepository;
use App\Infrastructure\Repositories\TodoRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(IProfileRepository::class, ProfileRepository::class);
        $this->app->bind(ITodoRepository::class, TodoRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

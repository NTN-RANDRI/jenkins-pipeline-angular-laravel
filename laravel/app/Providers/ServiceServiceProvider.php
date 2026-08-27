<?php

namespace App\Providers;

use App\Application\Services\IAuthService;
use App\Application\Services\IEmailService;
use App\Application\Services\IPasswordService as ServicesIPasswordService;
use App\Infrastructure\Services\LaravelAuthService;
use App\Infrastructure\Services\LaravelEmailService;
use App\Infrastructure\Services\LaravelPasswordService as ServicesLaravelPasswordService;
use Illuminate\Support\ServiceProvider;

class ServiceServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(IEmailService::class, LaravelEmailService::class);
        $this->app->bind(IAuthService::class, LaravelAuthService::class);
        $this->app->bind(ServicesIPasswordService::class, ServicesLaravelPasswordService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

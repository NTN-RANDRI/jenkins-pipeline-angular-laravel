<?php

namespace App\Infrastructure\Services;

use App\Application\Services\IEmailService;
use Illuminate\Contracts\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use Override;

class LaravelEmailService implements IEmailService
{

    #[Override]
    public function send(Mailable $mailable)
    {
        Mail::send($mailable);
    }

}
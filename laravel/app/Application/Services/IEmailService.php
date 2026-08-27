<?php

namespace App\Application\Services;

use Illuminate\Contracts\Mail\Mailable;

interface IEmailService
{

    public function send(Mailable $mailable);

}
<?php

namespace App\Http\Controllers;

use App\Application\UseCases\Profile\Register;
use App\Application\UseCases\Profile\ResendRegisterConfirmationEmail;
use App\Http\Mappers\RegisterRequestMapper;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    
    public function __construct(
        private Register $register,
        private ResendRegisterConfirmationEmail $resendRegisterConfirmationEmail,
    )
    {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        $registerInput = RegisterRequestMapper::toInputDTO($data);

        $profileOutput = $this->register->execute($registerInput);

        $request->session()->regenerate();

        return response()->json($profileOutput);
    }

    public function resendRegisterConfirmationEmail(Request $request): JsonResponse
    {
        $this->resendRegisterConfirmationEmail->execute();

        return response()->json(['message' => 'Register confirmation email resent']);
    }

}

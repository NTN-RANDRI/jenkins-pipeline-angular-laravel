<?php

namespace App\Http\Controllers;

use App\Application\DTOs\Authentification\ResetPasswordInputDTO;
use App\Application\UseCases\Authentification\Auth;
use App\Application\UseCases\Authentification\AuthVerified;
use App\Application\UseCases\Authentification\ChangePassword;
use App\Application\UseCases\Authentification\ForgotPassword;
use App\Application\UseCases\Authentification\Login;
use App\Application\UseCases\Authentification\Logout;
use App\Application\UseCases\Authentification\ResetPassword;
use App\Http\Mappers\LoginRequestMapper;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthentificationController extends Controller
{
    
    public function __construct(
        private Auth $authUseCase,
        private AuthVerified $authVerified,
        private Logout $logout,
        private Login $login,
        private ChangePassword $changePassword,
        private ForgotPassword $forgotPassword,
        private ResetPassword $resetPassword,
    )
    {}

    public function auth(): JsonResponse
    {
        $profileOutput = $this->authUseCase->execute();

        return response()->json($profileOutput);
    }

    public function verified(): JsonResponse
    {
        $profileOutput = $this->authVerified->execute();

        return response()->json($profileOutput);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        $loginInput = LoginRequestMapper::toInputDTO($data);

        $this->login->execute($loginInput);

        $request->session()->regenerate();

        return response()->json(['message' => 'Login successfully']);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->logout->execute();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $data = $request->validated();

        $this->changePassword->execute($data['password'], $data['newPassword']);

        return response()->json(['message' => 'Mot de passe changé avec succès']);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $data = $request->validate(['email' => 'required|email']);

        $this->forgotPassword->execute($data['email']);

        return response()->json(['message' => "Email de réinitialisation envoyé à l'adresse {$data['email']}"]);
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $data = $request->validated();

        $resetPasswordInput = ResetPasswordInputDTO::fromArray($data);

        $this->resetPassword->execute($resetPasswordInput);

        return response()->json(['message' => 'Mot de passe réinitialisé avec succès']);
    }

}

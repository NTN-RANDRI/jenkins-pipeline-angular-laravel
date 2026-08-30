import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ResetPasswordPage } from './pages/reset-password/reset-password.page';
import { ProfilePage } from './pages/profile/profile.page';
import { RegisterConfirmationPage } from './pages/register-confirmation/register-confirmation.page';
import { authGuard } from './guards/auth.guard';
import { verifiedGuard } from './guards/verified.guard';
import { notVerifiedGuard } from './guards/not-verified.guard';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { TodoPage } from './pages/todo/todo.page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
    },
    {
        path: 'todo',
        component: TodoPage,
        canActivate: [authGuard, verifiedGuard]
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'register',
        component: RegisterPage,
    },
    {
        path: 'register/confirmation',
        component: RegisterConfirmationPage,
        canActivate: [authGuard, notVerifiedGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordPage
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordPage
    },
    {
        path: 'profile',
        component: ProfilePage,
        canActivate: [authGuard, verifiedGuard]
    },
    {
        path: 'profile/change-password',
        component: ChangePasswordPage,
        canActivate: [authGuard, verifiedGuard]
    }
];


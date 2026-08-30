import { environment } from "@/environments/environment";

export const API_ROUTES = {
    auth: `${environment.apiBaseUrl}/auth`,
    register: `${environment.apiBaseUrl}/profile/register`,
    login: `${environment.apiBaseUrl}/auth/login`,
    changePassword: `${environment.apiBaseUrl}/auth/change-password`,
    forgotPassword: `${environment.apiBaseUrl}/auth/forgot-password`,
    resetPassword: `${environment.apiBaseUrl}/auth/reset-password`,
    resendRegisterConfirmationEmail: `${environment.apiBaseUrl}/profile/resend-register-confirmation-email`,
    todos: `${environment.apiBaseUrl}/todos`,
    clearCompletedTodos: `${environment.apiBaseUrl}/todos/clear-completed`,
}
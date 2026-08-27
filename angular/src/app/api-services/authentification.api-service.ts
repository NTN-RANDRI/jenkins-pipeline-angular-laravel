import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../api.routes';
import { LoginRequest } from '../requests/login.request';
import { ChangePasswordRequest } from '../requests/change-password.request';
import { ResetPasswordRequest } from '../requests/reset-password.request';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationApiService {

  private http = inject(HttpClient);

  public initCsrf() {
    return this.http.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
  }

  public auth(): Observable<any> {
    return this.http.get(API_ROUTES.auth);
  }

  public verified(): Observable<any> {
    return this.http.get(`${API_ROUTES.auth}/verified`);
  }

  public login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(API_ROUTES.login, loginRequest);
  }

  public logout(): Observable<any> {
    return this.http.post(`${API_ROUTES.auth}/logout`, null);
  }

  public changePassword(changePasswordRequest: ChangePasswordRequest): Observable<any> {
    return this.http.post(API_ROUTES.changePassword, changePasswordRequest);
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(API_ROUTES.forgotPassword, { email });
  }

  public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<any> {
    return this.http.post(API_ROUTES.resetPassword, resetPasswordRequest);
  }

}
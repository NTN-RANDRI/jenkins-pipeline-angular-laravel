import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from '../api.routes';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../requests/register.request';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {

  private http = inject(HttpClient);

  public register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(API_ROUTES.register, registerRequest.toJson());
  }

  public resendRegisterConfirmationEmail(): Observable<any> {
    return this.http.post<any>(API_ROUTES.resendRegisterConfirmationEmail, null);
  }

}

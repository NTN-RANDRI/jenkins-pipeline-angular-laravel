import { AuthentificationApiService } from '@/app/api-services/authentification.api-service';
import { LoginRequest } from '@/app/requests/login.request';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {

  private authApiService = inject(AuthentificationApiService);

  public login(loginRequest: LoginRequest): Observable<void> {
    return this.authApiService.login(loginRequest);
  }

}

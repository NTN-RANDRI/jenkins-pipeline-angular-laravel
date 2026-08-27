import { AuthentificationApiService } from '@/app/api-services/authentification.api-service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordFacade {

  private authApiService = inject(AuthentificationApiService);

  public forgotPassword(email: string) {
    return this.authApiService.forgotPassword(email);
  }

}

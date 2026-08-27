import { AuthentificationApiService } from '@/app/api-services/authentification.api-service';
import { ResetPasswordRequest } from '@/app/requests/reset-password.request';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordFacade {

  private authApiService = inject(AuthentificationApiService);

  public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<any> {
    return this.authApiService.resetPassword(resetPasswordRequest);
  }

}

import { AuthentificationApiService } from '@/app/api-services/authentification.api-service';
import { ChangePasswordRequest } from '@/app/requests/change-password.request';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordFacade {

  private authApiService = inject(AuthentificationApiService);

  public changePassword(changePasswordRequest: ChangePasswordRequest) {
    return this.authApiService.changePassword(changePasswordRequest);
  }

}

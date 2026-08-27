import { ProfileApiService } from '@/app/api-services/profile.api-service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterConfirmationFacade {

  private profileApiService = inject(ProfileApiService);

  public resendVerificationEmail(): Observable<any> {
    return this.profileApiService.resendRegisterConfirmationEmail();
  }

}

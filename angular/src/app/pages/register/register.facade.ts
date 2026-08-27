import { ProfileApiService } from '@/app/api-services/profile.api-service';
import { RegisterRequest } from '@/app/requests/register.request';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {

  public constructor(
    private profileApiService: ProfileApiService,
  ) {}

  public register(registerRequest: RegisterRequest): Observable<void> {
    return this.profileApiService.register(registerRequest);
  }

}

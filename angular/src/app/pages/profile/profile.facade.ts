import { AuthentificationApiService } from '@/app/api-services/authentification.api-service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {

  private authApiService = inject(AuthentificationApiService);

  public logout(): Observable<any> {
    return this.authApiService.logout();
  }

}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationApiService } from '../api-services/authentification.api-service';
import { catchError, map, of } from 'rxjs';
import { AuthState } from '../states/auth.state';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authApiUser = inject(AuthentificationApiService);
  const router = inject(Router);
  // const authState = inject(AuthState);

  return authApiUser.auth().pipe(
    map((user) => {
      // authState.setUser(user);
      return true;
    }),
    catchError((err) => {
      router.navigate(['/login']);
      return of(false);
    })
  );

};

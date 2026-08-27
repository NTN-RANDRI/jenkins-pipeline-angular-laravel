import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationApiService } from '../api-services/authentification.api-service';
import { catchError, map, of } from 'rxjs';
import { AuthState } from '../states/auth.state';

export const verifiedGuard: CanActivateFn = (route, state) => {
  const authApiUser = inject(AuthentificationApiService);
  const router = inject(Router);
    const authState = inject(AuthState);

  return authApiUser.verified().pipe(
    map((user) => {
      authState.setUser(user);
      return true;
    }),
    catchError((err) => {
      console.error(err);
      router.navigate(['/register/confirmation']);
      return of(false);
    })
  );
};

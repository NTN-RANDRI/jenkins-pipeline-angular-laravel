import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationApiService } from '../api-services/authentification.api-service';
import { catchError, map, of } from 'rxjs';

export const notVerifiedGuard: CanActivateFn = (route, state) => {
  const authApiUser = inject(AuthentificationApiService);
  const router = inject(Router);

  return authApiUser.verified().pipe(
    map((user) => {
      router.navigate(['/profile']);
      return false;
    }),
    catchError((err) => {
      return of(true);
    })
  );
};

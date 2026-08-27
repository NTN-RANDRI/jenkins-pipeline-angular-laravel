import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthState {

  private user = signal<any>(null);

  getUser = this.user.asReadonly();

  setUser(user: any) {
    this.user.set(user);
  }

}

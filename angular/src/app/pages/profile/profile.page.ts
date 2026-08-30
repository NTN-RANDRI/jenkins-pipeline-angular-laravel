import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFacade } from './profile.facade';
import { AuthState } from '@/app/states/auth.state';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
  imports: [CommonModule, RouterLink],
})
export class ProfilePage {

  private facade = inject(ProfileFacade);
  private authState = inject(AuthState);
  private router = inject(Router);

  protected user = this.authState.getUser;

  public onLogout() {
    this.facade.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

}

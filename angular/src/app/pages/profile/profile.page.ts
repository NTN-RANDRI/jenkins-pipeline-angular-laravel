import { Component, inject } from '@angular/core';
import { ProfileFacade } from './profile.facade';
import { AuthState } from '@/app/states/auth.state';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
  imports: [RouterLink],
})
export class ProfilePage {

  private facade = inject(ProfileFacade);
  private authState = inject(AuthState);
  private router = inject(Router);

  protected user = this.authState.getUser;

  public onLogout() {
    this.facade.logout().subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      }
    })
  }

  public onChangePassword() {
    console.log('Change password clicked');
    alert('Ouvrir le formulaire de changement de mot de passe');
  }

}

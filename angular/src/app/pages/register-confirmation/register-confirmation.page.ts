import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthentificationApiService } from '@/app/api-services/authentification.api-service';
import { RegisterConfirmationFacade } from './register-confirmation.facade';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register-confirmation',
  imports: [CommonModule, RouterLink],
  templateUrl: './register-confirmation.page.html',
  styleUrl: './register-confirmation.page.css',
})
export class RegisterConfirmationPage {

  private facade = inject(RegisterConfirmationFacade);

  protected isResending = signal(false);
  protected successMessage = signal<string | null>(null);

  protected onResendVerificationEmail(): void {
    this.successMessage.set(null);
    this.isResending.set(true);

    this.facade.resendVerificationEmail()
      .pipe(finalize(() => this.isResending.set(false)))
      .subscribe({
        next: (response) => {
          this.successMessage.set(response.message);
        },
        error: (err) => {
          console.error(err);
        }
      })
  }
}


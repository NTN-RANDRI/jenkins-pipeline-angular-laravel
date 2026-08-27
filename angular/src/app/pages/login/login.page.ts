import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LoginValidator } from '@/app/validators/login.validator';
import { FormGroupUtils } from '@/app/utils/form-group.utils';
import { LoginRequest } from '@/app/requests/login.request';
import { LoginFacade } from './login.facade';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage implements OnInit {

  private facade = inject(LoginFacade);
  private fb = inject(FormBuilder);
  private loginValidator = inject(LoginValidator);
  private router = inject(Router);

  protected loginForm!: FormGroup;
  protected credentialErrorMessage = signal<string|null>(null);
  protected isLogin = signal(false);

  ngOnInit(): void {
    this.initLoginForm();
  }

  protected onLogin() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.getRawValue();

      this.isLogin.set(true);

      this.facade.login(loginRequest)
        .pipe(
          finalize(() => this.isLogin.set(false))
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/profile']);
          },
          error: (err) => {
            this.credentialErrorMessage.set(err.error?.message || "Une erreur est survenue lors de la connexion. Veuillez réessayer.");
          }
        });
    }
  }

  protected onGoogleLogin() {
    console.log('Google login');
    // Implement Google OAuth here
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', this.loginValidator.email],
      password: ['', this.loginValidator.password]
    });
  }

  // UTILS
  protected getMessageError(field: string): string|null
  {
    return FormGroupUtils.getMessageError(this.loginForm, field, this.loginValidator.errorMessages);
  }

  protected isInvalid(field: string): boolean {
    return FormGroupUtils.isInvalid(this.loginForm, field);
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ResetPasswordValidator } from '@/app/validators/reset-password.validator';
import { FormGroupUtils } from '@/app/utils/form-group.utils';
import { ResetPasswordRequest } from '@/app/requests/reset-password.request';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordFacade } from './reset-password.facade';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.page.html',
  styleUrl: './reset-password.page.css',
})
export class ResetPasswordPage implements OnInit {

  private facade = inject(ResetPasswordFacade);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private resetPasswordValidator = inject(ResetPasswordValidator);

  protected resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') as string;
    const email = this.route.snapshot.queryParamMap.get('email') as string;

    this.initForms(email, token);
  }

  protected onResetPassword() {
    this.resetPasswordForm.markAllAsTouched();

    if (this.resetPasswordForm.valid) {
      const { confirmPassword, ...payload } = this.resetPasswordForm.getRawValue();
      const resetPasswordRequest: ResetPasswordRequest = payload;

      this.facade.resetPassword(resetPasswordRequest).subscribe({
        next: () => {
          alert('Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.');
        },
        error: (err) => {
          console.error('Erreur lors de la réinitialisation du mot de passe :', err);
          alert('Une erreur est survenue lors de la réinitialisation du mot de passe. Veuillez réessayer plus tard.');
        }
      })
    }
  }

  private initForms(email: string, token: string): void {
    this.resetPasswordForm = this.fb.group({
      email: [email],
      token: [token],
      password: ['', this.resetPasswordValidator.password],
      confirmPassword: ['', this.resetPasswordValidator.confirmPassword],
    });

    this.resetPasswordValidator.bindControlDependency(this.resetPasswordForm, 'password', 'confirmPassword');
  }

  protected getMessageError(field: string): string | null {
    return FormGroupUtils.getMessageError(this.resetPasswordForm, field, this.resetPasswordValidator.errorMessages);
  }

  protected isInvalid(field: string): boolean {
    return FormGroupUtils.isInvalid(this.resetPasswordForm, field);
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResetPasswordValidator } from '@/app/validators/reset-password.validator';
import { FormGroupUtils } from '@/app/utils/form-group.utils';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordFacade } from './forgot-password.facade';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.css',
})
export class ForgotPasswordPage implements OnInit {

  private facade = inject(ForgotPasswordFacade);
  private fb = inject(FormBuilder);
  private resetValidator = inject(ResetPasswordValidator);

  protected forgotForm!: FormGroup;
  protected success$ = new BehaviorSubject<string | null>(null);

  ngOnInit(): void {
    this.initForm();
  }

  protected onSubmit() {
    this.forgotForm.markAllAsTouched();

    if (this.forgotForm.valid) {
      const { email } = this.forgotForm.getRawValue();
      
      this.facade.forgotPassword(email).subscribe({
        next: () => {
          this.success$.next('Un e-mail de réinitialisation a été envoyé si le compte existe.');
        },
        error: (err) => {
          console.error('Error during forgot password request', err);
        }
      })

      console.log('Forgot password request for', email);
      this.success$.next('Un e-mail de réinitialisation a été envoyé si le compte existe.');
    }
  }

  private initForm() {
    this.forgotForm = this.fb.group({
      email: ['', this.resetValidator.email]
    });
  }

  protected getMessageError(field: string): string | null {
    return FormGroupUtils.getMessageError(this.forgotForm, field, this.resetValidator.errorMessages);
  }

  protected isInvalid(field: string): boolean {
    return FormGroupUtils.isInvalid(this.forgotForm, field);
  }

}

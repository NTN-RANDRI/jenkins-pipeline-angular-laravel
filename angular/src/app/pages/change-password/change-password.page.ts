import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangePasswordValidator } from '@/app/validators/change-password.validator';
import { FormGroupUtils } from '@/app/utils/form-group.utils';
import { ChangePasswordRequest } from '@/app/requests/change-password.request';
import { ChangePasswordFacade } from './change-password.facade';

@Component({
  

  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './change-password.page.html',
})
export class ChangePasswordPage implements OnInit {

  private facade = inject(ChangePasswordFacade);
  private fb = inject(FormBuilder);
  private changePasswordValidator = inject(ChangePasswordValidator);

  protected changePasswordForm!: FormGroup;
  protected successMessage = signal<string | null>(null);
  protected errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.initChangePasswordForm();
  }

  protected onChangePasswordSubmit() {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.changePasswordForm.markAllAsTouched();

    if (! this.changePasswordForm.valid) {
      return;
    }

    const data: ChangePasswordRequest = this.changePasswordForm.getRawValue();

    this.facade.changePassword(data).subscribe({
      next: (response) => {
        this.successMessage.set(response.message);
        this.changePasswordForm.reset();
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message);
      }
    });
  }

  private initChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      password: ['', this.changePasswordValidator.password],
      newPassword: ['', this.changePasswordValidator.newPassword],
      confirmPassword: ['', this.changePasswordValidator.confirmPassword]
    });

    this.changePasswordValidator.bindControlDependency(this.changePasswordForm, 'newPassword', 'confirmPassword');
  }

  // UTILS
  protected getMessageError(field: string): string | null {
    return FormGroupUtils.getMessageError(this.changePasswordForm, field, this.changePasswordValidator.errorMessages);
  }

  protected isInvalid(field: string): boolean {
    return FormGroupUtils.isInvalid(this.changePasswordForm, field);
  }

}

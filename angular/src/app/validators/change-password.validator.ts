import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BaseValidator } from './base.validator';

@Injectable({
    providedIn: 'root',
})
export class ChangePasswordValidator extends BaseValidator {

    public password: ValidatorFn[] = [Validators.required];
    public newPassword: ValidatorFn[] = [Validators.required];
    public confirmPassword: ValidatorFn[] = [Validators.required, this.matchPassword('newPassword')];

    public errorMessages = {
        password: {
            required: 'Champs requis.',
        },
        newPassword: {
            required: 'Champs requis.',
        },
        confirmPassword: {
            required: 'Champs requis.',
            passwordMismatch: 'Les mots de passe ne correspondent pas.'
        }
    };

    private matchPassword(passwordField: string): ValidatorFn {
        return (control: AbstractControl) => {
            const parent = control.parent as FormGroup | null;
            if (!parent) return null;

            const password = parent.get(passwordField)?.value;

            return password && control.value === password
                ? null
                : { passwordMismatch: true };
        };
    }
}

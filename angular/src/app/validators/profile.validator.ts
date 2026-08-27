import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BaseValidator } from './base.validator';

@Injectable({
    providedIn: 'root',
})
export class ProfileValidator extends BaseValidator {

    public firstName: ValidatorFn[] = [Validators.required];
    public lastName: ValidatorFn[] = [Validators.required];
    public email: ValidatorFn[] = [Validators.required, Validators.email];
    public currentPassword: ValidatorFn[] = [Validators.required];
    public password: ValidatorFn[] = [Validators.required];
    public confirmPassword: ValidatorFn[] = [Validators.required, this.matchPassword('password')];

    public errorMessages = {
        firstName: {
            required: 'Champs requis.',
        },
        lastName: {
            required: 'Champs requis.',
        },
        email: {
            required: 'Champs requis.',
            email: 'Le format de l\'email est incorrect.'
        },
        currentPassword: {
            required: 'Champs requis.',
        },
        password: {
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
            const confirmPassword = control.value;

            return password && confirmPassword && password !== confirmPassword
                ? { passwordMismatch: true }
                : null;
        };
    }

}

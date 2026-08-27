import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BaseValidator } from './base.validator';

@Injectable({
    providedIn: 'root',
})
export class RegisterValidator extends BaseValidator {

    public nom: ValidatorFn[] = [Validators.required];
    public prenom: ValidatorFn[] = [Validators.required];
    public email: ValidatorFn[] = [Validators.required, Validators.email];
    public password: ValidatorFn[] = [Validators.required];
    public confirmPassword: ValidatorFn[] = [Validators.required, this.matchPassword('password')];

    public errorMessages = {
        nom: {
            required: 'Nom obligatoire.',
        },
        prenom: {
            required: 'Prenom obligatoire.',
        },
        email: {
            required: 'Adresse email obligatoire.',
            email: 'Le format de l\'email est incorrect.',
            serverError: 'Message server error.'
        },
        password: {
            required: 'Mot de passe obligatoire.',
        },
        confirmPassword: {
            required: 'Confirmation du mot de passe obligatoire.',
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

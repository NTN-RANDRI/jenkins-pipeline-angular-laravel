import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterValidator } from '@/app/validators/register.validator';
import { FormGroupUtils } from '@/app/utils/form-group.utils';
import { RegisterRequest } from '@/app/requests/register.request';
import { RegisterFacade } from './register.facade';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './register.page.html',
    styleUrl: './register.page.css',
})
export class RegisterPage implements OnInit {

    private facade = inject(RegisterFacade);
    private fb = inject(FormBuilder);
    private registerValidator = inject(RegisterValidator);
    private router = inject(Router);

    protected registerForm!: FormGroup;
    protected isRegistering = signal(false);
    protected messageError = signal<string | null>(null);

    ngOnInit(): void {
        this.initRegisterForm();
    }

    protected onRegisterSubmit() {
        this.messageError.set(null);

        this.registerForm.markAllAsTouched();

        if (! this.registerForm.valid) {
            return;
        }

        const { confirmPassword, ...payload } = this.registerForm.getRawValue();
        const registerRequest = RegisterRequest.fromFormGroup(payload);

        this.isRegistering.set(true);

        this.facade.register(registerRequest)
            .pipe(
                finalize(() => this.isRegistering.set(false))
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['/register/confirmation']);
                },
                error: (err) => {
                    this.messageError.set(err.error?.message || 'Une erreur est survenue lors de l\'inscription.');
                },
            });
    }

    private initRegisterForm() {
        this.registerForm = this.fb.group({
            nom: ['', this.registerValidator.nom],
            prenom: ['', this.registerValidator.prenom],
            email: ['', this.registerValidator.email],
            password: ['', this.registerValidator.password],
            confirmPassword: ['', this.registerValidator.confirmPassword],
        });

        this.registerValidator.bindControlDependency(this.registerForm, 'password', 'confirmPassword');
    }

    // Utils
    protected getMessageError(field: string): string | null {
        return FormGroupUtils.getMessageError(this.registerForm, field, this.registerValidator.errorMessages);
    }

    protected isInvalid(field: string): boolean {
        return FormGroupUtils.isInvalid(this.registerForm, field);
    }

}

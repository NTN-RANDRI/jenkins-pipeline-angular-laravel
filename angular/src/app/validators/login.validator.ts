import { Injectable } from '@angular/core';
import { BaseValidator } from './base.validator';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginValidator extends BaseValidator {

  public email: ValidatorFn[] = [Validators.required, Validators.email];
  public password: ValidatorFn[] = [Validators.required];

  public errorMessages = {
    email: {
      required: "Champs requis.",
      email: "Le format de l'email est incorrect."
    },
    password: {
      required: "Champs requis."
    }
  }

}

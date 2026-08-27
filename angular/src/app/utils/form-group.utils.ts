import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormGroupUtils {

  static isInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.invalid && control.touched);
  }

  static getMessageError(
    form: FormGroup,
    field: string,
    errorMessages: { [field: string]: { [errorKey: string]: string } }
  ): string | null {
    const control = form.get(field);
    if (!control || !control.errors) return null;
  
    for (const errorKey in control.errors) {
      if (errorMessages[field] && errorMessages[field][errorKey]) {
        return errorMessages[field][errorKey];
      }
    }
  
    return null;
  }

}

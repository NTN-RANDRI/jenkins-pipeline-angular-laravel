import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseValidator {

  protected abstract errorMessages: Record<string, Record<string, string>>;

  public getErrorMessage(control: AbstractControl|null, field: string): string|null
  {
    if (!control || !control.errors) return null;

    const fieldErrors = this.errorMessages[field] || {};

    for (const errorName in control.errors) {
      const key = errorName as keyof typeof fieldErrors;
      if (fieldErrors[key]) return fieldErrors[key];
    }

    return null;
  }

  public bindControlDependency(form: FormGroup, sourceName: string, targetName: string): void {
    form.get(sourceName)?.valueChanges.subscribe(() => {
      form.get(targetName)?.updateValueAndValidity();
    });
  }

}

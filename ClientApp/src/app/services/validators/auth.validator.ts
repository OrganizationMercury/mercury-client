import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function hasUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasUppercase  = /[A-Z]/.test(control.value);
      return hasUppercase ? null : { noUppercase: true };
    };
}

export function hasLowercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasLowercase  = /[a-z]/.test(control.value);
        return hasLowercase ? null : { noLowercase: true };
    };
}

export function hasNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasNumber  = /\d/.test(control.value);
        return hasNumber ? null : { noNumber: true };
    };
}

export function hasSpecialSymbol(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasSpecialSymbol  = /[@$!%*#?&]/.test(control.value);
        return hasSpecialSymbol ? null : { noSpecialSymbol: true };
    };
}
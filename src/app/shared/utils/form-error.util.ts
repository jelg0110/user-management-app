import { AbstractControl, ValidationErrors } from '@angular/forms';

type ErrorMessageFn = (error: any) => string;

const GLOBAL_ERROR_MESSAGES: Record<string, string | ErrorMessageFn> = {
  required: 'This field is required',
  email: 'Invalid email format',
  minlength: (error) => `Minimum length is ${error.requiredLength}`,
  maxlength: (error) => `Maximum length is ${error.requiredLength}`,
  min: (error) => `Minimum value is ${error.min}`,
  max: (error) => `Maximum value is ${error.max}`,
  pattern: 'Invalid format'
};

export function getFormErrorMessage(
  control: AbstractControl | null
): string | null {
  if (!control || !control.errors || !control.touched) {
    return null;
  }

  const firstErrorKey = Object.keys(control.errors)[0];
  const errorValue = control.errors[firstErrorKey];

  const message = GLOBAL_ERROR_MESSAGES[firstErrorKey];

  if (!message) return 'Invalid field';

  return typeof message === 'function'
    ? message(errorValue)
    : message;
}
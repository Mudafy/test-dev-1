import { AbstractControl } from '@angular/forms';

export function numberValidator(control: AbstractControl): {[key: string]: any} | null {
			const regex = new RegExp('^[1-9]+$')
			const error = !regex.test(control.value);
      return error ? {'notNumber': {value: control.value}} : null;
  }
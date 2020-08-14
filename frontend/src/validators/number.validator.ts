import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * `RegExp` for allowing only numbers.
 */
const REGEXP_ONLY_NUMBERS = /\D+/;

/**
 * Validator for values of type `number`.
 */
export class VNumber {
    /**
     * Validate only numbers and apply the received range.
     * @param min length.
     * @param max length.
     */
    static limit(min: number, max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const regExp = new RegExp(REGEXP_ONLY_NUMBERS);
            let val = control.value;
            let isValid = false;

            if (val) {
                // remove non-digit values
                if (regExp.test(val)) {
                    val = val.replace(regExp, '');
                    val = val.length === 0 ? '' : val;
                    control.setValue(val);
                }

                // remove chars above limit
                if (val.length > max) {
                    val = val.substring(0, max);
                    control.setValue(val);
                }

                if (val.length >= min && val.length <= max) {
                    isValid = true;
                }

                if (isValid) {
                    return null;
                } else {
                    return { limit_check: { isValid } };
                }
            }
        };
    }

    /**
     * Validate days range for investment term.
     * @param min Min days.
     * @param max Max days.
     */
    static daysRange(min: number, max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const val = control.value;
            let error: string;

            if (val) {
                // Validate min and max limits and if is NaN
                if (isNaN(parseFloat(val))) {
                    error = 'error';
                } else if (parseInt(val, 10) < min || parseInt(val, 10) > max) {
                    error = 'VALIDATIONS.LIMIT_MAX_DAYS_EXCEDED';
                }
                if (!error) {
                    return null;
                } else {
                    return { format: { error } };
                }
            } else {
                error = 'error';
                return { format: { error } };
            }
        };
    }
}

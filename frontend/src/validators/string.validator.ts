import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * `RegExp` for detecting secuences suah as: `aaa` or `111`.
 */
const REGEXP_NO_SECUENCES = /(.)\1{2,}/;
/**
 * `RegExp` for allowing only letters and space.
 */
const REGEXP_ONLY_LETTERS = /[^a-zA-ZñÑ 'áéíóúÁÉÍÓÚ]/g;
/**
 * `RegExp` for allowing only letters, numbers and space.
 */
const REGEXP_LETTERS_AND_NUMBERS = /[^a-zA-Z0-9ñÑ 'áéíóúÁÉÍÓÚ]/g;
/**
 * `RegExp` for detecting consecutives chars asc.
 */
const REGEX_CONSECUTIVE_CHARS_ASC = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mnñ|nño|ñop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i;
/**
 * `RegExp` for detecting consecutives chars asc.
 */
const REGEX_CONSECUTIVE_NUMBERS_ASC = /012|123|234|345|456|567|678|789/i;
/**
 * `RegExp` for detecting consecutives chars desc.
 */
const REGEX_CONSECUTIVE_CHARS_DESC = /zyx|yxw|xwv|wvu|vut|uts|tsr|srq|rqp|qpo|poñ|oñn|ñnm|nml|mlk|lkj|kji|jih|ihg|hgf|gfe|fed|edc|dcb|cba/i;
/**
 * `RegExp` for detecting consecutives chars desc.
 */
const REGEX_CONSECUTIVE_NUMBERS_DESC = /987|876|765|654|543|432|321|210/i;

/**
 * Validator for values of type `string`.
 */
export class VString {
    /**
     * Allow only string characters and apply the received limit.
     * @param min length.
     * @param max length.
     */
    static limit(min: number, max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let val = control.value;
            let error: string;

            if (val) {
                // remove chars above limit
                if (val.length > max) {
                    val = val.substring(0, max);
                    control.setValue(val);
                }

                if (val.length < min || val.length > max) {
                    error = 'VALIDATIONS.MIN_MAX_LENGTH_ANSWER';
                }

                if (!error) {
                    return null;
                } else {
                    return { format: { error } };
                }
            }
        };
    }

    /**
     *  Allow only letters and validate the length.
     * @param min length.
     * @param max length.
     */
    static onlyLetters(min: number, max?: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const regExp = new RegExp(REGEXP_ONLY_LETTERS);
            let val = control.value;
            let isValid = false;

            if (val) {
                // remove non-alphanumeric values
                if (regExp.test(val)) {
                    val = val.replace(regExp, '');
                    val = val.length === 0 ? '' : val;
                    control.setValue(val);
                }

                if (val.length > 1) {
                    if (val[val.length - 1] === ' ' && val[val.length - 2] === ' ') {
                        val = val.substring(val.length - 1, '');
                        control.setValue(val);
                    }
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
     *  Allow letters and numbers and validate the length.
     * @param min length.
     * @param max length.
     */
    static lettersAndNumbers(min: number, max?: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const regExp = new RegExp(REGEXP_LETTERS_AND_NUMBERS);
            let val = control.value;
            let isValid = false;

            if (val) {
                // remove non-alphanumeric values
                if (regExp.test(val)) {
                    val = val.replace(regExp, '');
                    val = val.length === 0 ? '' : val;
                    control.setValue(val);
                }

                if (val.length > 1) {
                    if (val[val.length - 1] === ' ' && val[val.length - 2] === ' ') {
                        val = val.substring(val.length - 1, '');
                        control.setValue(val);
                    }
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
     * Validate non-accepted secuences in password:
     * - aaa | 111
     * - abc | 123
     * - cba | 321
     */
    static validateSecuences(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const noSecuences = new RegExp(REGEXP_NO_SECUENCES);
            const val: string = control.value.toLowerCase();
            let error: string;
            if (val) {
                if (noSecuences.test(val)) {
                    error = 'VALIDATIONS.NO_CONCECUTIVES_ANSWER';
                } else if (this.includesConsecutiveChars(val)) {
                    error = 'VALIDATIONS.NO_SECUENCES_ANSWER';
                }

                if (!error) {
                    return null;
                } else {
                    return { format: { error } };
                }
            }
        };
    }

    /**
     * Validate for consecutive chars such as: `123` or `321`.
     * @param value evaluated value.
     */
    static includesConsecutiveChars(value: string): boolean {
        value = value.toLowerCase();
        const noConsecutiveCharsAsc = new RegExp(REGEX_CONSECUTIVE_CHARS_ASC),
            noConsecutiveCharsDesc = new RegExp(REGEX_CONSECUTIVE_CHARS_DESC),
            noConsecutiveNumbersAsc = new RegExp(REGEX_CONSECUTIVE_NUMBERS_ASC),
            noConsecutiveNumbersDesc = new RegExp(REGEX_CONSECUTIVE_NUMBERS_DESC);

        if (
            noConsecutiveCharsAsc.test(value) ||
            noConsecutiveCharsDesc.test(value) ||
            noConsecutiveNumbersAsc.test(value) ||
            noConsecutiveNumbersDesc.test(value)
        ) {
            return true;
        }
        return false;
    }
}

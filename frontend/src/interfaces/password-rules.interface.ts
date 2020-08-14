/**
 * Interface that defines password rules object
 */
interface IPasswordRules {
    minLength: string;
    password: string;
    sequence: string;
    consecutive: string;
    bank: string;
    client?: string;
    equalPasswords?: string;
}

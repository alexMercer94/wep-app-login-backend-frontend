import { ILogin } from '../interfaces/loginRequest.interface';
import { ISignin } from '../interfaces/signinRequest.interface';

/**
 * Model for defining `MAuth` object.
 * Here you find functions for handle data about Auth
 */
export class MAuth {
  private static _signin: ISignin;
  private static _login: ILogin;
  private static _userAuthtenticated: any;

  // * Public Static Setters

  /**
   * Function to set data of Signin Request.
   * @param name Name
   * @param email email
   * @param password password
   */
  public static setSigninRequest(
    name: string,
    email: string,
    password: string
  ): void {
    this._signin = {
      name,
      email,
      password,
    };
  }

  /**
   * Function to set data of Login Request
   * @param email Email
   * @param password Password
   */
  public static setLoginRequest(email: string, password: string): void {
    this._login = {
      email,
      password,
    };
  }

  /**
   * Function to set value of user's token.
   * @param token Token
   */
  static setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // * Public Static Getters

  /**
   * Function to return object with Signin request object.
   */
  public static getSigninRequest(): ISignin {
    return this._signin;
  }
  /**
   * Function to return object with login request object.
   */
  public static getLoginRequest(): ILogin {
    return this._login;
  }

  /**
   * Function to return value with user's auth token.
   */
  static getToken(): string {
    return sessionStorage.getItem('token');
  }

  /**
   * Delete the current session.
   */
  static deleteSession(): void {
    this._userAuthtenticated = undefined;
    sessionStorage.clear();
  }
}

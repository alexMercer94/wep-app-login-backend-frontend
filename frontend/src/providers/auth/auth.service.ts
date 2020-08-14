import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILogin } from 'src/interfaces/loginRequest.interface';
import { ISignin } from 'src/interfaces/signinRequest.interface';
import { IUser } from 'src/interfaces/userAuthenticated.interface';
import { MAuth } from 'src/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'http://localhost:4000/api';
  isAuthenticated: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.isAuthenticated = new Subject<boolean>();
  }

  /**
   * Send Header flag value to hide or show buttons
   * @param flag Value
   */
  public sendFlag(flag: boolean): void {
    this.isAuthenticated.next(flag);
  }

  // * POST Methods

  /**
   * Crear user's account
   */
  public postSingnin(): Observable<any> {
    const payload: ISignin = MAuth.getSigninRequest();

    return this.http
      .post(`${this.baseURL}/users`, payload)
      .pipe(tap((res: any) => res));
  }

  /**
   * Login user
   */
  public postLogin(): Observable<{ token: string }> {
    const payload: ILogin = MAuth.getLoginRequest();

    return this.http.post(`${this.baseURL}/auth`, payload).pipe(
      tap((res: { token: string }) => {
        MAuth.setToken(res.token);

        return res;
      })
    );
  }

  // * GET Methods

  /**
   * Get user authenticated
   */
  public getUserAuthenticated(): Observable<IUser> {
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${MAuth.getToken()}`);

    return this.http
      .get(`${this.baseURL}/auth`, { headers })
      .pipe(tap((res: IUser) => res));
  }
}

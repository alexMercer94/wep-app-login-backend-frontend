import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/providers/auth/auth.service';
import { MAuth } from '../../models/auth.model';
import { VString } from '../../validators/string.validator';

// Regex for validate email input.
const REGEX_EMAIL = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  // * Public Methods

  /**
   * Return form controls for using on template in order to validate classes on inputs.
   */
  public get form(): any {
    return this.loginForm.controls;
  }

  /**
   * Create form group
   */
  public createFormGroup(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(REGEX_EMAIL),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, VString.limit(6, 15)])
      ),
    });
  }

  /**
   * Login user using service
   */
  public postLogin(): void {
    this.authService.postLogin().subscribe(
      (res: { token: string }) => {
        this.authService.sendFlag(true);
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        this.errorMsg = error.error.msg;
        setTimeout(() => {
          this.errorMsg = undefined;
        }, 3000);
      }
    );
  }

  // * User Interaction

  /**
   * Handler for login button
   */
  public btnLogin(): void {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    MAuth.setLoginRequest(email, password);
    this.postLogin();
  }
}

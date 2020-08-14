import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MAuth } from '../../models/auth.model';
import { AuthService } from '../../providers/auth/auth.service';
import { VString } from '../../validators/string.validator';

// Regex for validate email input.
const REGEX_EMAIL = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
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
    return this.signinForm.controls;
  }

  /**
   * Create form group
   */
  public createFormGroup(): void {
    this.signinForm = this.fb.group({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, VString.limit(10, 80)])
      ),
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
   * Create user's account using service
   */
  public postSignin(): void {
    this.authService.postSingnin().subscribe(
      (res: any) => {
        this.router.navigate(['/login']);
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
   * Handler for button create account
   */
  public btnCreateAccount(): void {
    const name = this.signinForm.get('name').value;
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    MAuth.setSigninRequest(name, email, password);
    this.postSignin();
  }
}

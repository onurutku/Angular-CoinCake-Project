import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  faCopyright,
  faInfo,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth.service';

interface Sign {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  faCopyright = faCopyright;
  faInfo = faInfo;
  faArrowLeft = faArrowLeft;
  isLoginMode: boolean = true;
  authForm: FormGroup;
  errorMessage: string = null;

  checkPasswords: ValidatorFn = (
    authForm: AbstractControl
  ): ValidationErrors | null => {
    if (this.isLoginMode) {
      return null;
    } else {
      let pass = authForm.get('password').value;
      let confirmpass = authForm.get('repassword').value;
      return pass === confirmpass ? null : { notSame: true };
    }
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]),
        repassword: new FormControl(null),
      },
      { validators: this.checkPasswords }
    );
  }
  changeMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }
  onSubmit() {
    const user: Sign = {
      email: this.authForm.get('email').value,
      password: this.authForm.get('password').value,
      returnSecureToken: true,
    };
    if (this.isLoginMode) {
      this.authService.login(user).subscribe(
        (responseData) => {
          console.log(responseData);
          this.router.navigate(['/home']);
        },
        (error) => {
          switch (error.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              this.errorMessage = 'e-mail not found';
              break;
            case 'INVALID_PASSWORD':
              this.errorMessage = 'invalid password,plase check your password';
              break;
            case 'USER_DISABLED':
              this.errorMessage = 'your account has been disabled';
              break;
          }
        }
      );
    } else {
      this.authService.signUp(user).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              this.errorMessage = 'This e-mail has already taken';
              break;
            case 'OPERATION_NOT_ALLOWED':
              this.errorMessage = 'Your password has been blocked';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              this.errorMessage = 'Too many attempt,please try again later';
              break;
          }
        }
      );
    }
  }
  onResetPassword() {
    this.authService.resetPassword();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCopyright, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  faCopyright = faCopyright;
  faInfo = faInfo;
  isLoginMode: boolean = true;
  authForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      repassword: new FormControl(null, Validators.required),
    });
  }
  changeMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    if (this.isLoginMode) {
    } else {
    }
  }
}

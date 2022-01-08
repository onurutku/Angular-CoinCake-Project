import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(
    private http: HttpClient,
    private router: Router,
    public angularfireAuth: AngularFireAuth
  ) {}
  signUp(user: any) {
    // return this.http.post<AuthResponseData>(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfxyw5WYuKOEEa309GL9TsBL4916U1E64',
    //   user
    // );
    return this.angularfireAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }
  storeUserInfo(userResponseData: any, userName: string) {
    if (userName) {
      return this.http.patch(
        'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/users/' +
          userResponseData.localId +
          '.json',
        {
          email: userResponseData.email,
          username: userName,
        }
      );
    } else {
      return this.http.patch(
        'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/users/' +
          userResponseData.localId +
          '.json',
        {
          email: userResponseData.email,
        }
      );
    }
  }
  login(user: any) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfxyw5WYuKOEEa309GL9TsBL4916U1E64',
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.autoLogout(+resData.expiresIn * 1000);
        })
      );
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
    this.user.next(null);
  }
  autoLogin() {
    const newExpirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const getFromLocal = JSON.parse(localStorage.getItem('user'));
    if (!getFromLocal) {
      return;
    }
    const willSend = new User(
      getFromLocal.email,
      getFromLocal.password,
      getFromLocal._token,
      getFromLocal._tokenExpirateDate
    );
    if (getFromLocal._token) {
      this.user.next(willSend);
    }
    const time = new Date(newExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(time);
  }
  autoLogout(timer: number) {
    setTimeout(() => {
      this.logout();
    }, timer);
  }
  resetPassword(email: string) {
    return this.angularfireAuth.sendPasswordResetEmail(email);
  }
  async sendVerificationMail() {
    (await this.angularfireAuth.currentUser)
      .sendEmailVerification()
      .then(() => {
        console.log('email sent');
      });
  }
}

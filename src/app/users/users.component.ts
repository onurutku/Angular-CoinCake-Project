import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

import { UserService } from './user.service';

interface UserData {
  email: string;
  username: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userLoggedIn: User;
  userSubs: Subscription;
  userData = <UserData>{
    email: '',
    username: '',
  };
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      this.userLoggedIn = data;
    });
    this.userSubs = this.userService
      .getUserById(this.userLoggedIn.password)
      .subscribe((data) => {
        this.userData = data;
      });
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userLoggedIn: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      console.log(data);
      this.userLoggedIn = data;
    });
  }
  ngOnDestroy(): void {}
}

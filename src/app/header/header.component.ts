import { Component, OnInit } from '@angular/core';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
// import { UserService } from '../users/user.service';

interface UserData {
  email: string;
  username: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  userLoggedIn: User;
  // userData = <UserData>{
  //   email: '',
  //   username: '',
  // };
  faChartPie = faChartPie;
  constructor(
    private authService: AuthService // private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      this.userLoggedIn = data;
    });
    // this.userService
    //   .getUserById(this.userLoggedIn.password)
    //   .subscribe((data) => {
    //     this.userData = data;
    //   });
  }
  onLogout() {
    this.authService.logout();
  }
}

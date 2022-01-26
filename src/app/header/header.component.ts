import { Component, OnInit } from '@angular/core';
import { faChartPie, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { MarketsService } from '../markets/markets.service';
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
  filterWord: string;
  isCollapsed = false;
  userLoggedIn: User;
  // userData = <UserData>{
  //   email: '',
  //   username: '',
  // };

  faChartPie = faChartPie;
  faBars = faBars;
  constructor(
    private authService: AuthService,
    private marketsService: MarketsService
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
  onKeyUp() {
    this.marketsService.search.next(this.filterWord);
  }
  onLogout() {
    this.authService.logout();
  }
}

import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChartPie, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { MarketsService } from '../markets/markets.service';

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
  navigate: boolean;
  isScroll: boolean;

  // userData = <UserData>{
  //   email: '',
  //   username: '',
  // };
  faChartPie = faChartPie;
  faBars = faBars;

  @HostListener('window:scroll') onScroll(e: Event): void {
    if (window.scrollY >= 35) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }
  constructor(
    private authService: AuthService,
    private marketsService: MarketsService,
    private router: Router,
    private location: Location
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
  //yeni bir method tanımla ve onu trigger et!
  onLogout() {
    this.router.navigate(['/auth']).then(() => {
      if (this.location.path() == '/auth') {
        this.authService.logout();
      }
    });
  }
  reload() {
    this.router.navigate(['/markets']);
    if (this.location.path() == '/markets') {
      window.location.reload();
    }
  }
}

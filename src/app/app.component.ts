import { Component, OnInit } from '@angular/core';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CoinCake';
  faCopyright = faCopyright;
  user: User = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.user.subscribe((data) => {
      this.user = data;
    });
  }
}

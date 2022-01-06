import { Component, OnInit } from '@angular/core';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faChartPie = faChartPie;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onLogout() {
    this.authService.logout();
  }
}

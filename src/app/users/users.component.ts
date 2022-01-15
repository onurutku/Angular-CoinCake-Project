import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { MarketsService } from '../markets/markets.service';
import { UserData } from './user-data.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  userLoggedIn: User;
  coinForm: FormGroup;
  markets: string[] = [];

  constructor(
    private authService: AuthService,
    private marketsService: MarketsService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.marketsService.getMarketPrices().subscribe((data) => {
      this.markets = data;
    });
    this.coinForm = new FormGroup({
      coin: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      bought: new FormControl(null, [Validators.required, Validators.min(0)]),
      boughtDate: new FormControl(null),
    });
    this.authService.user.subscribe((data) => {
      this.userLoggedIn = data;
    });
  }
  ngOnDestroy(): void {}
  onSubmit() {
    const userData: UserData = {
      id: this.userLoggedIn.password,
      email: this.userLoggedIn.email,
      coins: [
        {
          coinId: this.coinForm.get('coin').value.id,
          coinName: this.coinForm.get('coin').value.name,
          amount: this.coinForm.get('amount').value,
          bought: this.coinForm.get('bought').value,
          boughtDate: this.coinForm.get('boughtDate').value,
        },
      ],
    };
    this.userService.saveUsersData(userData);
  }
}

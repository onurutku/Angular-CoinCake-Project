import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
export class UsersComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  userLoggedIn: User;
  coinForm: FormGroup;
  markets: string[] = [];
  usersData = [];
  logCoin = {} as any;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private marketsService: MarketsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //fetch users coin data informations from service
    this.route.data.subscribe((data: Data) => {
      this.usersData = data['userData'];
    });
    this.userService.dataChanged.subscribe((data) => {
      this.getUsersData();
    });
    //fetch market prices for use to show on coin price area
    this.marketsService.getMarketPrices().subscribe((data) => {
      this.markets = data;
    });
    //date now for calendar placeholder
    const dateNow = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${new Date()
      .getDate()
      .toString()
      .padStart(2, '0')}T${new Date().getHours()}:${new Date().getMinutes()}`;
    //reactive form adding coins
    this.coinForm = new FormGroup({
      coin: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      bought: new FormControl(null, [Validators.required, Validators.min(0)]),
      boughtDate: new FormControl(dateNow),
    });
    //getting data from authService to know who is logged in to fetch his/her coin information from ID
    this.authService.user.subscribe((data) => {
      this.userLoggedIn = data;
    });
  }
  //to get coin data on each adding time without refreshing
  getUsersData() {
    this.userService
      .getUserData(this.userLoggedIn.password)
      .subscribe((data) => {
        this.usersData = data;
      });
  }
  //reactive form submit
  onSubmit() {
    if (this.coinForm.valid) {
      this.isLoading = true;
      const userData: UserData = {
        id: this.userLoggedIn.password,
        coin: {
          coinId: this.coinForm.get('coin').value.id,
          coinName: this.coinForm.get('coin').value.name,
          amount: this.coinForm.get('amount').value,
          bought: this.coinForm.get('bought').value,
          boughtDate: this.coinForm.get('boughtDate').value,
        },
      };
      //service side save method
      this.userService.saveUsersData(userData).subscribe(() => {
        this.userService.dataChanged.next(true);
        this.isLoading = false;
      });
      this.coinForm.reset();
    }
  }
  //html get current price for each coin in users list
  currentPrice(name: string) {
    this.marketsService.getCurrentPrice(name).subscribe((data) => {
      this.logCoin = data;
      const zurna = this.logCoin.market_data.current_price.usd;
      return zurna;
    });
  }
  //delete coin from users coinlist
  onDelete(id: string) {
    this.userService.deleteData(this.userLoggedIn.password, id);
  }
}

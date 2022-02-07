import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { MarketsService } from '../markets/markets.service';
import { UserData } from './user-data.model';
import { UserGuardService } from './user-guard.service';
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
  invalidSelect: boolean = false;
  invalidAmount: boolean = false;
  invalidBought: boolean = false;
  successAdd: boolean = false;
  deleted: string = null;
  askMessage: string = null;
  confirmOrCancel: boolean = null;
  willDelete: string = null;

  constructor(
    private authService: AuthService,
    private marketsService: MarketsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private userGuard: UserGuardService
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
      this.successAdd = true;
      this.errorTimer();
    } else {
      if (this.coinForm.get('coin').invalid) {
        this.invalidSelect = true;
      } else if (this.coinForm.get('amount').invalid) {
        this.invalidAmount = true;
      } else if (this.coinForm.get('bought').invalid) {
        this.invalidBought = true;
      }
      this.errorTimer();
    }
  }
  errorTimer() {
    setTimeout(() => {
      this.invalidAmount = false;
      this.invalidBought = false;
      this.invalidSelect = false;
      this.successAdd = false;
      this.deleted = null;
    }, 3000);
  }
  //html get current price for each coin in users list
  currentPrice(name: string) {
    this.marketsService.getCurrentPrice(name).subscribe((data) => {
      this.logCoin = data;
      const zurna = this.logCoin.market_data.current_price.usd;
      return zurna;
    });
  }
  //run modal to make response for delete coin
  onDelete(id: string) {
    this.askMessage = 'Are you sure to delete this coin from your list?';
    this.willDelete = id;
  }
  //delete coin from users coinlist
  receiveMessage($event) {
    this.confirmOrCancel = $event.cond;
    if (this.confirmOrCancel) {
      this.userService.deleteData(this.userLoggedIn.password, $event.id);
      this.deleted = 'Successfully deleted';
      this.askMessage = null;
      this.errorTimer();
      this.userGuard.project.next(this.confirmOrCancel);
    } else {
      this.askMessage = null;
    }
  }
  //ALTERNATİF ÇÖZÜM 2 / 1. çözüm user-guard.service.ts dosyasında
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.coinForm.untouched) {
      return true;
    } else {
      this.askMessage = 'Are you sure to leave from this page without saving?';
      return this.userGuard.project.pipe(
        map((data) => {
          return data ? data : false;
        })
      );
    }
  }
  //ALTERNATİF ÇÖZÜM 2 / 1. çözüm user-guard.service.ts dosyasında
}

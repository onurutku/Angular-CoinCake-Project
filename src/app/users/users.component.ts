import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import {
  faChevronRight,
  faChevronLeft,
  faPlus,
  faTrashAlt,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faSortAmountUp,
  faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons';
import { map, Observable, ReplaySubject, Subscription } from 'rxjs';
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
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faSortAlphaDown = faSortAlphaDown;
  faSortAlphaDownAlt = faSortAlphaDownAlt;
  faSortAmountUp = faSortAmountUp;
  faSortAmountDown = faSortAmountDown;
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
  totalPage: number;
  totalPageCeil: number;
  currentPage: number = 0;
  willSort = [];
  t = null;
  incomingFilterWord: string;
  sortCounter: string;
  errorOccured: string = null;
  dateNow: string = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${new Date()
    .getDate()
    .toString()
    .padStart(2, '0')}T${new Date().getHours()}:${new Date().getMinutes()}`;

  constructor(
    private authService: AuthService,
    private marketsService: MarketsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private userGuard: UserGuardService
  ) {}
  ngOnInit(): void {
    //fetch users coin data informations from service and pagination
    this.route.data.subscribe((data: Data) => {
      this.willSort = data['userData'];
      this.totalPage = data['userData'].length / 10;
      this.totalPageCeil = Math.ceil(this.totalPage);
      // this.usersData = data['userData'];
      for (
        let i = this.currentPage * 10;
        i < 10 * (this.currentPage + 1);
        i++
      ) {
        if (i < data['userData'].length) {
          this.usersData.push(data['userData'][i]);
        } else {
          return;
        }
      }
    });
    //to get coin data on each adding time without refreshing subject RxJs
    this.userService.dataChanged.subscribe(
      (data) => {
        if (data === true) {
          this.userService
            .getUserData(this.userLoggedIn.password)
            .subscribe((data) => {
              this.willSort = data;
              this.totalPage = data.length / 10;
              this.totalPageCeil = Math.ceil(this.totalPage);
              this.initUserData();
            });
        } else {
          if (this.userLoggedIn) {
            this.userService
              .getUserData(this.userLoggedIn.password)
              .subscribe((data) => {
                this.willSort = data;
                this.totalPage = data.length / 10;
                this.totalPageCeil = Math.ceil(this.totalPage);
                this.initUserDataOnDelete();
              });
          }
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
    //fetch market prices for use to show on coin price area
    this.marketsService.getMarketPrices().subscribe((data) => {
      this.markets = data;
    });
    //date now for calendar placeholder

    // this.dateNow = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
    //   .toString()
    //   .padStart(2, '0')}-${new Date()
    //   .getDate()
    //   .toString()
    //   .padStart(2, '0')}T${new Date().getHours()}:${new Date().getMinutes()}`;

    //reactive form adding coins
    this.coinForm = new FormGroup({
      coin: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      bought: new FormControl(null, [Validators.required, Validators.min(0)]),
      boughtDate: new FormControl(this.dateNow),
    });
    //getting data from authService to know who is logged in to fetch his/her coin information from ID
    this.authService.user.subscribe((data) => {
      this.userLoggedIn = data;
    });
    this.marketsService.search.subscribe((data) => {
      this.incomingFilterWord = data;
      if (this.incomingFilterWord) {
        this.userService
          .getUserData(this.userLoggedIn.password)
          .subscribe((data) => {
            this.usersData = data;
            // this.totalPage = data.length / 10;
            // this.totalPageCeil = Math.ceil(this.totalPage);
            // this.initUserData();
          });
      } else {
        this.initUserData();
      }
    });
  }
  //update page data for pagination when you add coin to list
  initUserData() {
    this.usersData = [];
    for (let i = this.currentPage * 10; i < 10 * (this.currentPage + 1); i++) {
      if (i < this.willSort.length) {
        this.usersData.push(this.willSort[i]);
      } else {
        return;
      }
    }
  }
  //update page data for pagination when you delete coin from list
  initUserDataOnDelete() {
    if (this.willSort.length > 0 && this.usersData.length <= 1) {
      this.currentPage--;
    }
    this.usersData = [];
    for (let i = this.currentPage * 10; i < 10 * (this.currentPage + 1); i++) {
      if (i < this.willSort.length) {
        this.usersData.push(this.willSort[i]);
      } else {
        return;
      }
    }
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
      this.userService.saveUsersData(userData).subscribe(
        (data) => {
          this.userService.dataChanged.next(true);
          this.successAdd = true;
          this.coinForm.reset();
          this.coinForm.get('boughtDate').setValue(this.dateNow);
        },
        (error) => {
          this.errorOccured = `${error.status}-${error.statusText}`;
          console.log(error);
        }
      );
      if (this.successAdd) {
        clearTimeout(this.t);
      }
      this.errorTimer(3000);
    } else {
      if (this.coinForm.get('coin').invalid) {
        this.invalidSelect = true;
      } else if (this.coinForm.get('amount').invalid) {
        this.invalidAmount = true;
      } else if (this.coinForm.get('bought').invalid) {
        this.invalidBought = true;
      }
      this.errorTimer(3000);
    }
  }
  errorTimer(time: number) {
    this.t = setTimeout(() => {
      this.invalidAmount = false;
      this.invalidBought = false;
      this.invalidSelect = false;
      this.successAdd = false;
      this.deleted = null;
      this.isLoading = false;
    }, time);
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
    this.userGuard.project.next($event.cond);
    if (this.confirmOrCancel) {
      if (this.userLoggedIn) {
        this.isLoading = true;
        this.userService
          .deleteData(this.userLoggedIn.password, $event.id)
          .subscribe(
            () => {
              this.userService.dataChanged.next(false);
              this.deleted = 'Successfully deleted';
              this.isLoading = false;
            },
            (error) => {
              this.errorOccured = `${error.status}-${error.statusText}`;
            }
          );
        this.askMessage = null;
        this.errorTimer(3000);
      }
    } else {
      this.askMessage = null;
    }
  }
  //ALTERNAT??F ????Z??M 2 / 1. ????z??m user-guard.service.ts dosyas??nda
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
  //ALTERNAT??F ????Z??M 2 / 1. ????z??m user-guard.service.ts dosyas??nda

  pageUp() {
    if (this.currentPage < Math.floor(this.totalPage)) {
      this.currentPage++;
      this.initUserData();
    }
  }
  pageDown() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.initUserData();
    }
  }
  initfilterMarketData() {
    this.marketsService.getMarketPrices().subscribe((data) => {
      this.markets = data;
    });
  }
  sortBy(what: string) {
    if (!this.sortCounter) {
      this.willSort.sort((a, b) => {
        if (a[what] > b[what]) return 1;
        if (a[what] < b[what]) return -1;
        return 0;
      });
      switch (what) {
        case 'coinName':
          this.sortCounter = 'a';
          break;
        case 'coinId | currentPrice | async':
          this.sortCounter = 'b';
          break;
        case 'bought':
          this.sortCounter = 'c';
          break;
        case 'amount':
          this.sortCounter = 'd';
          break;
        case 'balance':
          this.sortCounter = 'e';
          break;
        case 'pldollar':
          this.sortCounter = 'f';
          break;
        case 'plpercent':
          this.sortCounter = 'g';
          break;
        case 'date':
          this.sortCounter = 'h';
          break;
      }
    } else {
      this.willSort.sort((a, b) => {
        if (a[what] > b[what]) return -1;
        if (a[what] < b[what]) return 1;
        return 0;
      });
      this.sortCounter = '';
    }
    this.initUserData();
  }
}

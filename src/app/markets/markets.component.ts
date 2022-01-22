import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketsService } from './markets.service';
import {
  faChevronRight,
  faChevronLeft,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faSortAmountUp,
  faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css'],
})
export class MarketsComponent implements OnInit, OnDestroy {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faSortAlphaDown = faSortAlphaDown;
  faSortAlphaDownAlt = faSortAlphaDownAlt;
  faSortAmountUp = faSortAmountUp;
  faSortAmountDown = faSortAmountDown;
  markets: string[] = [];
  willSort: string[] = [];
  totalPage: number;
  currentPage: number = 0;
  incomingFilterWord: string;
  filterSubs: Subscription;
  totalPageCeil: number;
  sortCounter: string;
  constructor(
    private marketsService: MarketsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.willSort = data['markets'];
      this.totalPage = data['markets'].length / 15;
      this.totalPageCeil = Math.ceil(this.totalPage);
      for (
        let i = this.currentPage * 15;
        i < 15 * (this.currentPage + 1);
        i++
      ) {
        if (i < data['markets'].length) {
          this.markets.push(data['markets'][i]);
        } else {
          return;
        }
      }
    });
    this.filterSubs = this.marketsService.search.subscribe((data) => {
      this.incomingFilterWord = data;
      if (this.incomingFilterWord) {
        this.initfilterMarketData();
      } else {
        this.initMarketData();
      }
    });
  }
  initfilterMarketData() {
    this.marketsService.getMarketPrices().subscribe((data) => {
      this.markets = data;
    });
  }
  initMarketData() {
    this.markets = [];
    for (let i = this.currentPage * 15; i < 15 * (this.currentPage + 1); i++) {
      if (i < this.willSort.length) {
        this.markets.push(this.willSort[i]);
      } else {
        return;
      }
    }
  }
  pageUp() {
    if (this.currentPage < Math.floor(this.totalPage)) {
      this.currentPage++;
      this.initMarketData();
    }
  }
  pageDown() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.initMarketData();
    }
  }
  ngOnDestroy(): void {
    this.filterSubs.unsubscribe();
  }
  sortBy(what: string) {
    if (!this.sortCounter) {
      this.willSort.sort((a, b) => {
        if (a[what] > b[what]) return 1;
        if (a[what] < b[what]) return -1;
        return 0;
      });
      switch (what) {
        case 'name':
          this.sortCounter = 'a';
          break;
        case 'current_price':
          this.sortCounter = 'b';
          break;
        case 'price_change_percentage_24h':
          this.sortCounter = 'c';
          break;
        case 'total_volume':
          this.sortCounter = 'd';
          break;
        case 'circulating_supply':
          this.sortCounter = 'e';
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
    this.initMarketData();
  }
}

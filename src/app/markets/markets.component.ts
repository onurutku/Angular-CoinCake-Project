import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

import { MarketsService } from './markets.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css'],
})
export class MarketsComponent implements OnInit, OnDestroy {
  markets: string[] = [];
  totalPage: number;
  currentPage: number = 0;
  incomingFilterWord: string;
  filterSubs: Subscription;
  constructor(
    private marketsService: MarketsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.totalPage = data['markets'].length / 15;
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
      if (this.incomingFilterWord !== '') {
        this.initfilterMarketData();
      } else if (this.incomingFilterWord === '') {
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
    this.marketsService.getMarketPrices().subscribe((data) => {
      for (
        let i = this.currentPage * 15;
        i < 15 * (this.currentPage + 1);
        i++
      ) {
        if (i < data.length) {
          this.markets.push(data[i]);
        } else {
          return;
        }
      }
    });
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
}

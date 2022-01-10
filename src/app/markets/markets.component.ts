import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { MarketsService } from './markets.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css'],
})
export class MarketsComponent implements OnInit {
  markets: string[] = [];
  totalPage: number;
  currentPage: number = 0;
  constructor(
    private marketsService: MarketsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.totalPage = data['markets'].length / 15;
      console.log('current page:' + this.currentPage);
      console.log('total page: ' + this.totalPage);
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
}

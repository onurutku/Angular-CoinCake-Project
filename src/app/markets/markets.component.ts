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
  constructor(
    private marketsService: MarketsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initMarketData();
    setInterval(() => {
      this.initMarketData();
    }, 15000);
  }
  initMarketData() {
    this.route.data.subscribe((data: Data) => {
      this.markets = data['markets'];
    });
    // this.marketsService.getMarketPrices().subscribe((data) => {
    //   this.markets = data;
    //   console.log(data);
    // });
  }
}

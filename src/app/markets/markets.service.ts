import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketsService {
  constructor(private http: HttpClient) {}
  getMarketPrices() {
    return this.http
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .pipe(
        map((responseData) => {
          const markets = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              markets.push({ ...responseData[key], id: key });
            }
          }
          return markets;
        })
      );
  }
}

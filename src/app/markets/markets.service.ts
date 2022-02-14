import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketsService {
  search = new Subject<string>();
  errorMsg = new Subject<string>();
  constructor(private http: HttpClient, private router: Router) {}
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
              markets.push({ ...responseData[key] });
            }
          }
          return markets;
        }),
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg.next(`Error: ${error.error.message}`);
            // this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg.next(this.getServerErrorMessage(error));
          }
          this.router.navigate(['/not-found']);
          return throwError(this.errorMsg);
        })
      );
  }
  getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.status}`;
      }
      case 403: {
        return `Access Denied: ${error.status}`;
      }
      case 429: {
        return `Has been blocked by Cors Policy: ${error.status}`;
      }
      case 500: {
        return `Internal Server Error: ${error.status}`;
      }
      default: {
        return `Unknown Server Error: ${error.status}`;
      }
    }
  }
  getCurrentPrice(name: string) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/' + name).pipe(
      map((responseData) => {
        return responseData;
      }),
      catchError((error) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMsg.next(`Error: ${error.error.message}`);
          // this.errorMsg = `Error: ${error.error.message}`;
        } else {
          this.errorMsg.next(this.getServerErrorMessage(error));
        }
        this.router.navigate(['/not-found']);
        return throwError(this.errorMsg);
      })
    );
  }
}

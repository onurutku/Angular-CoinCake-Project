import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MarketsService } from './markets.service';

@Injectable({
  providedIn: 'root',
})
export class MarketsResolverService implements Resolve<any> {
  constructor(private marketsService: MarketsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> {
    return this.marketsService.getMarketPrices();
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { MarketsService } from '../markets/markets.service';

@Pipe({
  name: 'currentPrice',
})
export class CurrentPricePipe implements PipeTransform {
  currentPrice: any;
  constructor(private marketsService: MarketsService) {}

  async transform(value: any) {
    const lowerValue: string = value.toLowerCase();
    if (value === 0) {
      return value;
    }
    await this.marketsService
      .getCurrentPrice(lowerValue)
      .toPromise()
      .then((format) => {
        this.currentPrice = format;
      });
    return +this.currentPrice.market_data.current_price.usd;
  }
}

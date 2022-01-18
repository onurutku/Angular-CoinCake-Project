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
    const nonspace: string = lowerValue.replace(/\s/g, '');
    if (value === 0) {
      return value;
    }
    await this.marketsService
      .getCurrentPrice(nonspace)
      .toPromise()
      .then((format) => {
        this.currentPrice = format;
      });
    return +this.currentPrice.market_data.current_price.usd;
  }
}

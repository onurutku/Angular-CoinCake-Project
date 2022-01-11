import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, filterWord: string): any {
    if (value.length === 0 || filterWord === undefined || filterWord === '') {
      return value;
    }
    const resultArray = [];
    for (let item of value) {
      if (
        item.symbol.toUpperCase().includes(filterWord.toUpperCase()) ||
        item.name.toUpperCase().includes(filterWord.toUpperCase())
      ) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}

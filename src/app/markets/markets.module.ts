import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketsComponent } from './markets.component';
import { SearchPipe } from './search.pipe';
import { SortPipe } from './sort.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MarketsComponent, SearchPipe, SortPipe],
  imports: [CommonModule, FontAwesomeModule],
  exports: [MarketsComponent, SearchPipe, SortPipe],
})
export class MarketsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketsComponent } from './markets.component';
import { SearchPipe } from './search.pipe';
import { SortPipe } from './sort.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MarketsResolverService } from './markets-resolver.service';
import { AuthGuardService } from '../auth/auth-guard.service';

@NgModule({
  declarations: [MarketsComponent, SearchPipe, SortPipe],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MarketsComponent,
        resolve: { markets: MarketsResolverService },
        canActivate: [AuthGuardService],
      },
    ]),
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [MarketsComponent, SearchPipe, SortPipe],
})
export class MarketsModule {}

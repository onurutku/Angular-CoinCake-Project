import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
    ConfirmComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    ConfirmComponent,
    NotFoundComponent,
  ],
})
export class SharedModule {}

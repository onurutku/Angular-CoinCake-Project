import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [LoadingSpinnerComponent, DropdownDirective, ConfirmComponent],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, DropdownDirective, ConfirmComponent],
})
export class SharedModule {}

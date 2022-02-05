import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
      },
    ]),
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CurrentPricePipe } from './current-price.pipe';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, EditProfileComponent, CurrentPricePipe],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
  ],
  exports: [UsersComponent, EditProfileComponent, CurrentPricePipe],
})
export class UsersModule {}

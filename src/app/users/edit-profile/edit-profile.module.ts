import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',

        component: EditProfileComponent,
      },
    ]),
    ReactiveFormsModule,
  ],
  exports: [EditProfileComponent, FontAwesomeModule],
})
export class EditProfileModule {}

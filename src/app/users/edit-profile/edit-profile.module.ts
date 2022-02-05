import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',

        component: EditProfileComponent,
      },
    ]),
  ],
  exports: [EditProfileComponent],
})
export class EditProfileModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CurrentPricePipe } from './current-price.pipe';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../auth/auth-guard.service';
import { UserGuardService } from './user-guard.service';
import { UsersResolverService } from './users-resolver.service';

@NgModule({
  declarations: [UsersComponent, CurrentPricePipe],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        canActivate: [AuthGuardService, UserGuardService],
        canDeactivate: [UserGuardService],
        resolve: { userData: UsersResolverService },
      },
    ]),
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
  ],
  exports: [UsersComponent, CurrentPricePipe],
})
export class UsersModule {}

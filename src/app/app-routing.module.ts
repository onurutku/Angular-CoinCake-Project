import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { UsersComponent } from './users/users.component';
import { UserGuardService } from './users/user-guard.service';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user/:uid',
    component: UsersComponent,
    canActivate: [AuthGuardService, UserGuardService],
  },
  {
    path: 'user/:uid/edit',
    // redirectTo: '/home',
    // pathMatch: 'full',
    component: EditProfileComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
// import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { UsersComponent } from './users/users.component';
import { UserGuardService } from './users/user-guard.service';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { MarketsComponent } from './markets/markets.component';
import { MarketsResolverService } from './markets/markets-resolver.service';
import { UsersResolverService } from './users/users-resolver.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/markets',
    pathMatch: 'full',
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   // canActivate: [AuthGuardService],
  // },
  // {
  //   path: 'markets',
  //   component: MarketsComponent,
  //   // loadChildren: () =>
  //   //   import('./markets/markets.module').then((m) => m.MarketsModule),
  //   resolve: { markets: MarketsResolverService },
  //   canActivate: [AuthGuardService],
  // },
  {
    path: 'markets',
    loadChildren: () =>
      import('./markets/markets.module').then((m) => m.MarketsModule),
  },
  // {
  //   path: 'user/:uid',
  //   component: UsersComponent,
  //   canActivate: [AuthGuardService, UserGuardService],
  //   resolve: { userData: UsersResolverService },
  // },
  {
    path: 'user/:uid',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  // {
  //   path: 'user/:uid/edit',

  //   component: EditProfileComponent,
  // },
  {
    path: 'user/:uid/edit',
    loadChildren: () =>
      import('./users/edit-profile/edit-profile.module').then(
        (m) => m.EditProfileModule
      ),
  },

  // {
  //   path: 'auth',
  //   component: AuthComponent,
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
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

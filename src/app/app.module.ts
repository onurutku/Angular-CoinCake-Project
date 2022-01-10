import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { UsersComponent } from './users/users.component';
import { UserService } from './users/user.service';
import { UserGuardService } from './users/user-guard.service';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarketsComponent } from './markets/markets.component';
import { MarketsService } from './markets/markets.service';
import { MarketsResolverService } from './markets/markets-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    UsersComponent,
    EditProfileComponent,
    MarketsComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    AuthGuardService,
    UserService,
    UserGuardService,
    MarketsService,
    MarketsResolverService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

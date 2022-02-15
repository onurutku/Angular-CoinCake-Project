import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { UserService } from './users/user.service';
import { UserGuardService } from './users/user-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarketsService } from './markets/markets.service';
import { MarketsResolverService } from './markets/markets-resolver.service';
import { UsersResolverService } from './users/users-resolver.service';
import { UsersModule } from './users/users.module';
import { MarketsModule } from './markets/markets.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { EditProfileModule } from './users/edit-profile/edit-profile.module';
import { FooterComponent } from './footer/footer.component';
import { EditProfileService } from './users/edit-profile/edit-profile.service';

//Users Module
// import { CurrentPricePipe } from './users/current-price.pipe';
// import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
// import { UsersComponent } from './users/users.component';

//Markets Module
// import { MarketsComponent } from './markets/markets.component';
// import { SearchPipe } from './markets/search.pipe';
// import { SortPipe } from './markets/sort.pipe';

//Auth Module
// import { AuthComponent } from './auth/auth.component';

//Shared Module
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { DropdownDirective } from './shared/dropdown.directive';
// import { ConfirmComponent } from './shared/confirm/confirm.component';
// import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent],
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
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbModule,
    UsersModule,
    MarketsModule,
    AuthModule,
    SharedModule,
    EditProfileModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    AuthGuardService,
    UserService,
    UserGuardService,
    UsersResolverService,
    MarketsService,
    MarketsResolverService,
    EditProfileService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private auth: User;
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.authService.user.subscribe((data) => {
      this.auth = data;
    });
    if (this.auth) {
      return true;
    } else {
      this.router.navigate(['auth']);
    }
  }
}

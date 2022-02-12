import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

export interface CanComponentDeactivate {
  canDeactivate: () =>
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
  coinForm: FormGroup;
  askMessage: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserGuardService
  implements CanActivate, CanDeactivate<CanComponentDeactivate>
{
  project = new Subject<any>();
  // project = new BehaviorSubject<boolean>(null);
  userLogged: User;
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
      this.userLogged = data;
    });
    if (this.userLogged.password === route.params.uid) {
      return true;
    } else {
      this.router.navigate(['/not-found']);
    }
  }
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    //ÇÖZÜM BURADA (ALTERNATİF 1) 2. alternatif user.component.ts dosyasında canDeactivate() methodunda
    // if (component.coinForm.untouched) {
    //   return true;
    // } else {
    //   component.askMessage = 'are you sure?';
    //   return this.project.pipe(
    //     map((data) => {
    //       return data ? data : false;
    //     })
    //   );
    // }
    //ÇÖZÜM BURADA (ALTERNATİF 1) 2. alternatif user.component.ts dosyasında canDeactivate() methodunda
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

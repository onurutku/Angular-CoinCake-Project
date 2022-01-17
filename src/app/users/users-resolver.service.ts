import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

interface UserResponseData {}
@Injectable({
  providedIn: 'root',
})
export class UsersResolverService implements Resolve<UserResponseData> {
  constructor(private userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | UserResponseData
    | Observable<UserResponseData>
    | Promise<UserResponseData> {
    return this.userService.getUserData(route.params['uid']);
  }
}

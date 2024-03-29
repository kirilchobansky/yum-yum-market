import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private userService: AuthService, private router: Router){

  }
  canActivate(
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.userService.currentUser.token) return true;

    this.router.navigate(['/users/login'], {queryParams:{returnUrl: state.url}})
    return false;
  }
}
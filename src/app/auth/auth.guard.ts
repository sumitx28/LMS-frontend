import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth : AuthService , public router : Router){}

  canActivate(){

    if(this.auth.isUserLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }

  }
  
}

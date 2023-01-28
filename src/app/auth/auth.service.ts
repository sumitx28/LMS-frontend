import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API_URL = 'http://localhost:3000/auth';

  constructor(public http : HttpClient) { }

  loginUser(userLoginCredentials : any){
    return this.http.post(`${this.AUTH_API_URL}/login` , userLoginCredentials);
  }

  logoutUser(){
    return this.http.get(`${this.AUTH_API_URL}/logout`);
  }

  isUserLoggedIn(){
    const item = localStorage.getItem('cookieId');

    if(item){
      return true;
    }
    else{
      return false;
    }
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public auth : AuthService,public router : Router){}

  logoutCurrentUser(){
    this.auth.logoutUser().subscribe(res => {
      localStorage.removeItem('cookieId');
      this.router.navigate(['login']);
    },err => alert(err))
  }

}

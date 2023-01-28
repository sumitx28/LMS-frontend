import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public auth : AuthService , public router : Router){}

  ngOnInit(){
    if(this.auth.isUserLoggedIn()){
      this.router.navigate(['dashboard']);
    }
  }

  loginUser(userLoginCredentials : any){
    this.auth.loginUser(userLoginCredentials).subscribe((res : any) => {
      if(res.status == true){
        localStorage.setItem('cookieId' , res.id);
        this.router.navigate(['dashboard']);
      }
      else{
        alert('Invalid Credentials. Try Again!!!')
        this.router.navigate(['login']);
      }
    })
  }

}

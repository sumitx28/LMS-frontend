import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: AuthService;
  let injector : TestBed;
  let httpMock : HttpTestingController;
  let router : Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent , NgForm ],
      imports : [HttpClientTestingModule],
      providers : [AuthService , Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    injector = getTestBed();
    userService = injector.inject(AuthService);
    httpMock = injector.inject(HttpTestingController);
    router = injector.inject(Router);
    component.auth = userService;
    component.router = router;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user and navigate to dashboard' , () => {
    const navigateSpy = spyOn(router, 'navigate');

    const cred = {
      username : 'admin',
      password : 'admin'
    };

    const expectedResult = {
      id : 'cyzcbaf',
      status : true
    }

    component.loginUser(cred);
    httpMock.expectOne('http://localhost:3000/auth/login').flush(expectedResult);

    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);

  })

  it('should not login on invalid credentials' , () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(window , 'alert');

    const cred = {
      username : 'adminnn',
      password : 'admin'
    };

    const expectedResult = {
      status : false
    }

    component.loginUser(cred);
    httpMock.expectOne('http://localhost:3000/auth/login').flush(expectedResult);

    expect(navigateSpy).toHaveBeenCalledWith(['login']);
    expect(window.alert).toHaveBeenCalledWith('Invalid Credentials. Try Again!!!');

  })
  

});

import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let injector : TestBed;
  let authService : AuthService;
  let router : Router;
  let httpMock : HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports : [HttpClientTestingModule],
      providers : [AuthService , Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    injector = getTestBed();
    authService = injector.inject(AuthService);
    router = injector.inject(Router);
    httpMock = injector.inject(HttpTestingController);

    component.auth = authService;
    component.router = router;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should logout user when logout link is clicked' , () => {
    const navigateSpy = spyOn(router , 'navigate');
    component.logoutCurrentUser();
    httpMock.expectOne('http://localhost:3000/auth/logout').flush(true);

    expect(navigateSpy).toHaveBeenCalledWith(['login']);

  })


});

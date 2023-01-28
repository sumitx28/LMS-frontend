
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let auth: AuthService;
  let injector: TestBed;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [AuthService , Router]
    });
    guard = TestBed.inject(AuthGuard);
    injector = getTestBed();
    router = injector.inject(Router);
    auth = injector.inject(AuthService);
    
    guard.auth = auth;
    guard.router = router;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is logged in' , () => {

    auth.isUserLoggedIn = () => {
      return true;
    }

    expect(guard.canActivate()).toBe(true);
  })

  it('should return false if user is not logged in' , () => {
    const navigateSpy = spyOn(router , 'navigate');

    auth.isUserLoggedIn = () => {
      return false;
    }

    guard.canActivate()

    expect(navigateSpy).toHaveBeenCalledWith(['login']);
    expect(guard.canActivate()).toBe(false);
  })

});

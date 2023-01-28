import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(AuthService);
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {

    const creds = {
      username: 'admin',
      password: 'admin'
    };

    const expectedResult = {
      status: true,
      id: "SMJJ6k5uI5O8_LKwM9VXyrSXs1_-Eq7j"
    };

    let result : any;

    service.loginUser(creds).subscribe(res => {
      result = res;
    })
    
    httpMock.expectOne('http://localhost:3000/auth/login').flush(expectedResult);

    expect(result).toBe(expectedResult);
    
  })

  it('should logout user' , () => {

    let result:any;

    service.logoutUser().subscribe(res => {
      result = res;
    })

    httpMock.expectOne('http://localhost:3000/auth/logout').flush(true);

    expect(result).toBe(true);

  })

});

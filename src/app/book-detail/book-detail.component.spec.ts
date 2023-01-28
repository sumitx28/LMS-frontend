import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BooksServiceService } from '../services/books-service.service';

import { BookDetailComponent } from './book-detail.component';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let injector: TestBed;
  let router: Router;
  let bookService: BooksServiceService;
  let httpMock: HttpTestingController;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [BookDetailComponent, HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [Router, BooksServiceService, {
        provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: convertToParamMap({
              id: 4
            })
          }
        }
      }]
    })
      .compileComponents();


    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;

    injector = getTestBed();
    router = injector.inject(Router);
    bookService = injector.inject(BooksServiceService);
    httpMock = injector.inject(HttpTestingController);
    activatedRoute = injector.inject(ActivatedRoute);

    component.router = router;
    component.bookService = bookService;
    component.activatedRoute = activatedRoute;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get value of id from activated route', () => {
    expect(component.id).toBe(4);
  })

  it('should get book referenced to id 4 from the activated route', () => {

    const expectedResult = {
      "id": 4,
      "name": "Flight",
      "author": "Lynn Steger Strong",
      "description": "Fiction Novel",
      "issued": false,
      "studentName": "",
      "createdAt": "2023-01-23T08:38:06.000Z",
      "updatedAt": "2023-01-26T08:21:47.000Z"
    };

    httpMock.expectOne('http://localhost:3000/library/books/4').flush(expectedResult);

    expect(component.book).toBe(expectedResult);

  })

  it('Should update book with the given data', () => {

    spyOn(window, 'alert');
    const navigateSpy = spyOn(router, 'navigate');

    const updatedBookData = {
      name: 'ABC',
      author: 'DEF',
      description: 'GHI'
    };

    const expectedResult2 = "Record Updated";
    const expectedResult1 = {
      "id": 6,
      "name": "The Book Thief",
      "author": "Markus Zusak",
      "description": "Fiction",
      "issued": true,
      "studentName": "Sumit",
      "createdAt": "2023-01-23T08:41:08.000Z",
      "updatedAt": "2023-01-28T05:50:33.000Z"
    };

    expect(component.id).toBe(4);

    const temp1 = httpMock.match('http://localhost:3000/library/books/4');
    temp1[0].flush(expectedResult1);

    component.updateBookDetail(updatedBookData);
    
    httpMock.expectOne('http://localhost:3000/library/books/4').flush(expectedResult2);

    expect(window.alert).toHaveBeenCalledWith(expectedResult2);
    expect(navigateSpy).toHaveBeenCalledWith(['books-list']);

  })


});

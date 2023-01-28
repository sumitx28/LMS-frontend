import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { BooksServiceService } from '../services/books-service.service';

import { IssuedBooksComponent } from './issued-books.component';

describe('IssuedBooksComponent', () => {
  let component: IssuedBooksComponent;
  let fixture: ComponentFixture<IssuedBooksComponent>;
  let injector: TestBed;
  let bookService: BooksServiceService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuedBooksComponent, HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [BooksServiceService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IssuedBooksComponent);
    component = fixture.componentInstance;

    injector = getTestBed();
    bookService = injector.inject(BooksServiceService);
    httpMock = injector.inject(HttpTestingController);
    component.bookService = bookService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load with all issued books', () => {
    const expectedResult = [{
      "id": 6,
      "name": "The Book Thief",
      "author": "Markus Zusak",
      "description": "Fiction",
      "issued": true,
      "studentName": "Sumit",
      "createdAt": "2023-01-23T08:41:08.000Z",
      "updatedAt": "2023-01-28T05:50:33.000Z"
    }, {
      "id": 10,
      "name": "123",
      "author": "123",
      "description": "123",
      "issued": true,
      "studentName": "Sumit",
      "createdAt": "2023-01-26T08:21:56.000Z",
      "updatedAt": "2023-01-28T05:46:38.000Z"
    }];

    httpMock.expectOne('http://localhost:3000/library/books/issued-books').flush(expectedResult);

    expect(component.allBooks).toBe(expectedResult);

  })

  it('should return book when clicked on return button' , () => {
    spyOn(window , 'alert');
    const expectedResult = "Book Returned";

    component.returnBook(10);
    httpMock.expectOne('http://localhost:3000/library/books/return/10').flush(expectedResult);

    expect(window.alert).toHaveBeenCalledWith(expectedResult);

  })


});

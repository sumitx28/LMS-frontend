import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { BooksServiceService } from '../services/books-service.service';

import { BooksListComponent } from './books-list.component';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  let injector: TestBed;
  let bookService: BooksServiceService;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksListComponent, HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [BooksServiceService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksListComponent);
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

  it('allBooks must contain total books and their details on page init', () => {

    const expectedResult = [{
      "id": 4,
      "name": "Flight",
      "author": "Lynn Steger Strong",
      "description": "Fiction Novel",
      "issued": false,
      "studentName": "",
      "createdAt": "2023-01-23T08:38:06.000Z",
      "updatedAt": "2023-01-26T08:21:47.000Z"
    }, {
      "id": 5,
      "name": "Ocean's Echo",
      "author": "Everina Maxwell",
      "description": "Science Fiction",
      "issued": false,
      "studentName": "",
      "createdAt": "2023-01-23T08:39:04.000Z",
      "updatedAt": "2023-01-26T08:21:25.000Z"
    }, {
      "id": 6,
      "name": "The Book Thief",
      "author": "Markus Zusak",
      "description": "Fiction",
      "issued": true,
      "studentName": "Sumit",
      "createdAt": "2023-01-23T08:41:08.000Z",
      "updatedAt": "2023-01-23T15:21:42.000Z"
    }, {
      "id": 9,
      "name": "test",
      "author": "TEST",
      "description": "test",
      "issued": false,
      "studentName": null,
      "createdAt": "2023-01-24T10:17:33.000Z",
      "updatedAt": "2023-01-24T10:17:33.000Z"
    }, {
      "id": 10,
      "name": "123",
      "author": "123",
      "description": "123",
      "issued": false,
      "studentName": null,
      "createdAt": "2023-01-26T08:21:56.000Z",
      "updatedAt": "2023-01-26T08:21:56.000Z"
    }];

    httpMock.expectOne('http://localhost:3000/library/books').flush(expectedResult);

    expect(component.allBooks).toBe(expectedResult);

  });

  it('should delete book when called' , () => {
    spyOn(window, "alert");
    const expectedResult = "Record Deleted";
    component.deleteBook(9);
    httpMock.expectOne('http://localhost:3000/library/books/9').flush(expectedResult);
    expect(window.alert).toHaveBeenCalledWith(expectedResult);
  })

  it('should return book of specified id' , () => {
    spyOn(window , 'alert');
    const expectedResult = "Book Returned";
    component.returnBook(6);
    httpMock.expectOne('http://localhost:3000/library/books/return/6').flush(expectedResult);
    expect(window.alert).toHaveBeenCalledWith(expectedResult);
  })

  it('should issue book of specified id to the student' , () => {
    spyOn(window , 'alert');
    spyOn(window , 'prompt').and.returnValue('Sumit');
    const expectedResult = "Book issued to Sumit";
    component.issueBook(10);
    httpMock.expectOne('http://localhost:3000/library/books/issue/10').flush(expectedResult);
    expect(window.alert).toHaveBeenCalledWith(expectedResult);
  })


});

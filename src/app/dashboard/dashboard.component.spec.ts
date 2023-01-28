import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { BooksServiceService } from '../services/books-service.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let bookService: BooksServiceService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [BooksServiceService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    injector = getTestBed();
    bookService = injector.inject(BooksServiceService);
    httpMock = injector.inject(HttpTestingController);
    component.http = bookService;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch count of all available books', () => {

    let availableBooksExpectedRes = [{
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

    httpMock.expectOne('http://localhost:3000/library/books/available-books').flush(availableBooksExpectedRes);

    expect(component.availableBooks).toBe(availableBooksExpectedRes.length);

  })

  it('should fetch count of all issued books', () => {

    const issuedBooksExpectedResult = [{
      "id": 6,
      "name": "The Book Thief",
      "author": "Markus Zusak",
      "description": "Fiction",
      "issued": true,
      "studentName": "Sumit",
      "createdAt": "2023-01-23T08:41:08.000Z",
      "updatedAt": "2023-01-23T15:21:42.000Z"
    }]

    httpMock.expectOne('http://localhost:3000/library/books/issued-books').flush(issuedBooksExpectedResult);

    expect(component.issuedBooks).toBe(issuedBooksExpectedResult.length);

  })

  it('should fetch count of all the books', () => {

    const allBooksExpectedResult = [{
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
    }]

    httpMock.expectOne('http://localhost:3000/library/books').flush(allBooksExpectedResult);

    expect(component.totalBooks).toBe(allBooksExpectedResult.length);

  })

});

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { BooksServiceService } from '../services/books-service.service';

import { AvailableBooksComponent } from './available-books.component';

describe('AvailableBooksComponent', () => {
  let component: AvailableBooksComponent;
  let fixture: ComponentFixture<AvailableBooksComponent>;
  let injector: TestBed;
  let bookService: BooksServiceService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableBooksComponent, HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [BooksServiceService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AvailableBooksComponent);
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

  it('should fetch all available books on load', () => {
    const expectedResult = [{
      "id": 4,
      "name": "Flight",
      "author": "Lynn Stegar Strong",
      "description": "Fiction Novel",
      "issued": false,
      "studentName": "",
      "createdAt": "2023-01-23T08:38:06.000Z",
      "updatedAt": "2023-01-28T06:56:12.000Z"
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
      "id": 10,
      "name": "1234",
      "author": "124",
      "description": "1234",
      "issued": false,
      "studentName": "",
      "createdAt": "2023-01-26T08:21:56.000Z",
      "updatedAt": "2023-01-28T07:22:15.000Z"
    }];

    httpMock.expectOne('http://localhost:3000/library/books/available-books').flush(expectedResult);

    expect(component.allBooks).toBe(expectedResult);

  })

  it('should delete book when called' , () => {
    spyOn(window, "alert");
    const expectedResult = "Record Deleted";
    component.deleteBook(9);
    httpMock.expectOne('http://localhost:3000/library/books/9').flush(expectedResult);
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

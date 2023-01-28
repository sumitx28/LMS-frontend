import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { BooksServiceService } from './books-service.service';

describe('BooksServiceService', () => {
  let service: BooksServiceService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(BooksServiceService);
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add book to the database', () => {
    const expectedResult = "record created";

    let result: any;

    service.addBook({
      name: 'ABC',
      author: 'DEF',
      description: 'GHI'
    })
      .subscribe(res => result = res);

    httpMock.expectOne('http://localhost:3000/library/books').flush(expectedResult);

    expect(result).toBe(expectedResult);

  })

  it('should get book referenced to an id', () => {
    const id = 4;

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

    let result: any;

    service.getBookById(id).subscribe(res => result = res);

    httpMock.expectOne('http://localhost:3000/library/books/4').flush(expectedResult);

    expect(result).toBe(expectedResult);

  })

  it('should get all the books from database', () => {

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
      "name": "1234",
      "author": "124",
      "description": "1234",
      "issued": false,
      "studentName": "",
      "createdAt": "2023-01-26T08:21:56.000Z",
      "updatedAt": "2023-01-28T07:22:15.000Z"
    }, {
      "id": 11,
      "name": "11",
      "author": "11",
      "description": "11",
      "issued": false,
      "studentName": null,
      "createdAt": "2023-01-28T08:30:12.000Z",
      "updatedAt": "2023-01-28T08:30:12.000Z"
    }, {
      "id": 12,
      "name": "111111",
      "author": "111111",
      "description": "111111",
      "issued": false,
      "studentName": null,
      "createdAt": "2023-01-28T09:30:20.000Z",
      "updatedAt": "2023-01-28T09:30:20.000Z"
    }, {
      "id": 13,
      "name": "55",
      "author": "55",
      "description": "55",
      "issued": false,
      "studentName": null,
      "createdAt": "2023-01-28T09:35:42.000Z",
      "updatedAt": "2023-01-28T09:35:42.000Z"
    }];

    let result: any;

    service.getAllBooks().subscribe(res => result = res);
    httpMock.expectOne('http://localhost:3000/library/books').flush(expectedResult);
    expect(result).toBe(expectedResult);
  })

  it('should get all available books', () => {
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
    }, {
      "id": 11,
      "name": "11",
      "author": "11",
      "description": "11",
      "issued": false,
      "studentName": null,
      "createdAt": "2023-01-28T08:30:12.000Z",
      "updatedAt": "2023-01-28T08:30:12.000Z"
    }, {
      "id": 12,
      "name": "111111",
      "author": "111111",
      "description": "111111",
      "issued": false,
      "studentName": null,
      "createdAt": "2023-01-28T09:30:20.000Z",
      "updatedAt": "2023-01-28T09:30:20.000Z"
    }, {
      "id": 13,
      "name": "55",
      "author": "55",
      "description": "55",
      "issued": false,
      "studentName": null,
      "createdAt": "2023-01-28T09:35:42.000Z",
      "updatedAt": "2023-01-28T09:35:42.000Z"
    }];

    let result: any;

    service.getAllAvailableBooks().subscribe(res => result = res);
    httpMock.expectOne('http://localhost:3000/library/books/available-books').flush(expectedResult);
    expect(result).toBe(expectedResult);

  })

  it('should get all issued books', () => {
    const expectedResult = [{
      "id": 6,
      "name": "The Book Thief",
      "author": "Markus Zusak",
      "description": "Fiction",
      "issued": true,
      "studentName": "Sumit",
      "createdAt": "2023-01-23T08:41:08.000Z",
      "updatedAt": "2023-01-28T05:50:33.000Z"
    }];

    let result: any;

    service.getAllIssuedBooks().subscribe(res => result = res);
    httpMock.expectOne('http://localhost:3000/library/books/issued-books').flush(expectedResult);
    expect(result).toBe(expectedResult);

  })

  it('should update the book with the given id and details' , () => {
    const updatedBookData = {
      name : 'ABC',
      author : 'DEF',
      description : 'GHI'
    };
    const expectedResult = "Record Updated";
    let result: any;

    service.updateBook(2 , updatedBookData).subscribe(res => result = res);
    httpMock.expectOne('http://localhost:3000/library/books/2').flush(expectedResult);
    expect(result).toBe(expectedResult);
  })

  it('delete the book with given id' , () => {
    const expectedResult = "Record Deleted";
    let result : any;

    service.deleteBook(2).subscribe(res => result = res);

    httpMock.expectOne('http://localhost:3000/library/books/2').flush(expectedResult);

    expect(result).toBe(expectedResult);

  })

  it('issue the book with given id to the student' , () => {
    const expectedResult = "Book issued to Sumit";
    let result : any;

    service.issueBook(10 , "Sumit").subscribe(res => result = res);
    httpMock.expectOne('http://localhost:3000/library/books/issue/10').flush(expectedResult);
    expect(result).toBe(expectedResult);
  })
  
  it('Return the book with given id' , () => {
    const expectedResult = "Book Returned";
    let result : any;

    service.returnBook(10).subscribe(res => result = res);
    httpMock.expectOne('http://localhost:3000/library/books/return/10').flush(expectedResult);
    expect(result).toBe(expectedResult);
  })

});

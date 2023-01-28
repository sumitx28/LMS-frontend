import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HeaderComponent } from '../header/header.component';
import { BooksServiceService } from '../services/books-service.service';

import { AddBookComponent } from './add-book.component';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let injector : TestBed;
  let router : Router;
  let httpMock : HttpTestingController;
  let bookService : BooksServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookComponent , HeaderComponent , NgForm ],
      imports : [HttpClientTestingModule],
      providers : [BooksServiceService , Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;

    injector = getTestBed();
    router = injector.inject(Router);
    httpMock = injector.inject(HttpTestingController);    
    bookService = injector.inject(BooksServiceService);

    component.router = router;
    component.bookService = bookService;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the book to records when add book button is clicked' , () => {

    spyOn(window , 'alert');
    const navigateSpy = spyOn(router , 'navigate');

    const inputBookData = {
      name : '123',
      author : 'abc',
      description : 'auyg'
    };

    const expectedResult = "record created";

    component.addBook(inputBookData);

    httpMock.expectOne('http://localhost:3000/library/books').flush(expectedResult);

    expect(window.alert).toHaveBeenCalledWith(expectedResult);
    expect(navigateSpy).toHaveBeenCalledWith(['/books-list'])

  })

});

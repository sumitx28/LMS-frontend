import { Component } from '@angular/core';

import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent {
  allBooks : any;

  constructor(public bookService : BooksServiceService){}

  ngOnInit(){
    this.bookService.getAllBooks().subscribe(res => this.allBooks = res);
  }

  // Delete the specific book from database using BookId
  deleteBook(bookId : any){
    this.bookService.deleteBook(bookId).subscribe(res => {
      alert(res);
      this.ngOnInit();
    },err => alert(err));
  }

  // Issue the specific book from database using BookId
  issueBook(bookId : any){
    const studentName = prompt('Enter Student Name : ');
    this.bookService.issueBook(bookId , studentName).subscribe((msg) => {
      alert(msg);
      this.ngOnInit();
    },err => alert(err));
  }

  // Return the specific book from database using BookId
  returnBook(bookId : any){
    this.bookService.returnBook(bookId).subscribe((msg) => {
      alert(msg);
      this.ngOnInit();
    },err => alert(err))
  }

}

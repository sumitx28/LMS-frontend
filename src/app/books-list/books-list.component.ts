import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent {
  allBooks : any;

  constructor(private bookService : BooksServiceService , private router : Router){}

  ngOnInit(){
    this.bookService.getAllBooks().subscribe(res => this.allBooks = res);
  }

  deleteBook(bookId : any){
    this.bookService.deleteBook(bookId).subscribe(res => {
      alert(res);
      this.ngOnInit();
    });
  }

  issueBook(bookId : any){
    const studentName = prompt('Enter Student Name : ');
    this.bookService.issueBook(bookId , studentName).subscribe((msg) => {
      alert(msg);
      this.ngOnInit();
    });
  }

  returnBook(bookId : any){
    this.bookService.returnBook(bookId).subscribe((msg) => {
      alert(msg);
      this.ngOnInit();
    })
  }

}

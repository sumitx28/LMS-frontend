import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.css']
})
export class AvailableBooksComponent {

  allBooks : any;

  constructor(private bookService : BooksServiceService , private router : Router){}

  ngOnInit(){
    this.bookService.getAllAvailableBooks().subscribe(res => this.allBooks = res);
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

}

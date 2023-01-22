import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-issued-books',
  templateUrl: './issued-books.component.html',
  styleUrls: ['./issued-books.component.css']
})
export class IssuedBooksComponent {
  allBooks : any;

  constructor(private bookService : BooksServiceService , private router : Router){}

  ngOnInit(){
    this.bookService.getAllIssuedBooks().subscribe(res => this.allBooks = res);
  }

  returnBook(bookId : any){
    this.bookService.returnBook(bookId).subscribe((msg) => {
      alert(msg);
      this.ngOnInit();
    })
  }
}

import { Component } from '@angular/core';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-issued-books',
  templateUrl: './issued-books.component.html',
  styleUrls: ['./issued-books.component.css']
})
export class IssuedBooksComponent {
  allBooks : any;

  constructor(public bookService : BooksServiceService){}

  ngOnInit(){
    this.bookService.getAllIssuedBooks().subscribe(res => this.allBooks = res ,err => alert(err));
  }

  returnBook(bookId : any){
    this.bookService.returnBook(bookId).subscribe((msg) => {
      alert(msg);
      this.ngOnInit();
    },err => alert(err))
  }
}

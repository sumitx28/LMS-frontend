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

}

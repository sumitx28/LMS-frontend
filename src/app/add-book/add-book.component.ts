import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(public bookService : BooksServiceService , public router : Router){}

  // Inserts the given Book Data to database.
  addBook(data : any){
    this.bookService.addBook(data).subscribe((res) => {
      alert(res);
      this.router.navigate(['/books-list'])
    } , err => alert(err))
  }

}

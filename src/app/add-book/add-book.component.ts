import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(private bookService : BooksServiceService , private router : Router){

  }

  onSubmit(data : any){
    this.bookService.addBook(data).subscribe((res) => {
      alert(res);
      this.router.navigate(['/books-list'])
    }
    )
  }

}

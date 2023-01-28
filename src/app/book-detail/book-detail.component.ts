import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  id : any;
  book : any;

  constructor(public router : Router , public activatedRoute : ActivatedRoute , public bookService : BooksServiceService){
  }

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.getBookById(this.id).subscribe(res => {
      this.book = res;
    },err => alert(err))
  }

  // Update the book with the given Id and Obtained details from the form
  updateBookDetail(data : any){
    this.bookService.updateBook(this.id , data).subscribe(res => {
      alert(res);
      this.router.navigate(['books-list']);
    },err => alert(err))
  }

}

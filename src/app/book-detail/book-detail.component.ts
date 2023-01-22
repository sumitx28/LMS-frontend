import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../services/book';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  id : any;
  book : any;

  constructor(private router : Router , private activatedRoute : ActivatedRoute , private bookService : BooksServiceService){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(){
    this.bookService.getBookById(this.id).subscribe(res => {
      this.book = res;
    })
  }

  onSubmit(data : any){
    this.bookService.updateBook(this.id , data).subscribe(res => {
      alert(res);
      this.router.navigate(['/books-list']);
    })
  }

}

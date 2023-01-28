import { Component } from '@angular/core';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalBooks : any;
  issuedBooks : any;
  availableBooks : any;

  constructor(public http : BooksServiceService){}

  ngOnInit(){
    // Getting total number of available books
    this.http.getAllAvailableBooks().subscribe((data : any) => {
      this.availableBooks = data.length;
    },err => alert(err))

    // Getting total issued books
    this.http.getAllIssuedBooks().subscribe((data : any) => {
      this.issuedBooks = data.length;
    },err => alert(err))

    // Getting total books in the database
    this.http.getAllBooks().subscribe((data : any) => {
      this.totalBooks = data.length
    },err => alert(err))

  }

}

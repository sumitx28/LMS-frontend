import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksListComponent } from './books-list/books-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuedBooksComponent } from './issued-books/issued-books.component';

const routes: Routes = [
  {path : '' , redirectTo : 'dashboard' , pathMatch : 'full'},
  {path : 'add-book' , component : AddBookComponent},
  {path : 'books-list' , component : BooksListComponent},
  {path : 'book-detail' , component : BookDetailComponent},
  {path : 'edit-book/:id' , component : BookDetailComponent},
  {path : 'available-books' , component : AvailableBooksComponent},
  {path : 'issued-books' , component : IssuedBooksComponent},
  {path : 'dashboard' , component : DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

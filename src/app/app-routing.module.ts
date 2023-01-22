import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksListComponent } from './books-list/books-list.component';

const routes: Routes = [
  {path : '' , redirectTo : 'books-list' , pathMatch : 'full'},
  {path : 'add-book' , component : AddBookComponent},
  {path : 'books-list' , component : BooksListComponent},
  {path : 'book-detail' , component : BookDetailComponent},
  {path : 'edit-book/:id' , component : BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

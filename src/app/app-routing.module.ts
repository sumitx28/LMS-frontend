import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AuthGuard } from './auth/auth.guard';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksListComponent } from './books-list/books-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuedBooksComponent } from './issued-books/issued-books.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : '' , redirectTo : 'login' , pathMatch : 'full'},
  {path : 'add-book' , component : AddBookComponent , canActivate : [AuthGuard]},
  {path : 'books-list' , component : BooksListComponent , canActivate : [AuthGuard]},
  {path : 'book-detail' , component : BookDetailComponent , canActivate : [AuthGuard]},
  {path : 'edit-book/:id' , component : BookDetailComponent , canActivate : [AuthGuard]},
  {path : 'available-books' , component : AvailableBooksComponent , canActivate : [AuthGuard]},
  {path : 'issued-books' , component : IssuedBooksComponent , canActivate : [AuthGuard]},
  {path : 'dashboard' , component : DashboardComponent , canActivate : [AuthGuard]},
  {path : 'login' , component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

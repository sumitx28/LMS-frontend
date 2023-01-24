import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksServiceService } from './services/books-service.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { IssuedBooksComponent } from './issued-books/issued-books.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    BookDetailComponent,
    AddBookComponent,
    BooksListComponent,
    AvailableBooksComponent,
    IssuedBooksComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [BooksServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

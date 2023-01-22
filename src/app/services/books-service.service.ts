import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  API_URL : string = 'http://localhost:3000/library/books';
  httpHeader = new HttpHeaders().set('Content-Type' , 'application/json');

  constructor(private http : HttpClient) { }

  addBook(data : Book){
    return this.http.post(this.API_URL , data);
  }

  getBookById(id : any){
    return this.http.get(`${this.API_URL}/${id}`);
  }

  getAllBooks(){
    return this.http.get(this.API_URL);
  }

  updateBook(id : number , data : Book){
    return this.http.put(`${this.API_URL}/${id}` , data);
  }

  deleteBook(id : number){
    return this.http.delete(`${this.API_URL}/${id}`);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUlr = "http://localhost:8080/api/v1/books"
  constructor(private httpClient:HttpClient) { }

  getbooks(): Observable<Book[]>{
    return this.httpClient.get<GetResponseBooks>(this.baseUlr).pipe(
      map(response => response._embedded.books)
    )
  }

}
interface GetResponseBooks{
  _embedded:{
    books: Book[];
  }
}
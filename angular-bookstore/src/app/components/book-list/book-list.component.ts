import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book'
import { BookService } from '../../services/book.service';
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { typeWithParameters } from '@angular/compiler/src/render3/util';


@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',

  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  currentCategoryId: number;
  searchMode: boolean;
  constructor(private _bookService: BookService, private _activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRouter.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  listBooks() {
    this.searchMode = this._activatedRouter.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchBooks()
    } else {
      this.handleListBooks();
    }
  }

  private handleListBooks() {
    const hasCategoryId: boolean = this._activatedRouter.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRouter.snapshot.paramMap.get('id');
    }else {
      this.currentCategoryId = 1;
    }
    
    this._bookService.getbooks(this.currentCategoryId).subscribe(data => this.books = data);
  }

  private handleSearchBooks() {
     const keyword:string = this._activatedRouter.snapshot.paramMap.get('keyword');
    this._bookService.searchbooks(keyword).subscribe(
      data => {
        this.books = data;
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Book} from '../../common/book'
import{BookService} from '../../services/book.service';
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  currentCategoryId: number;
  constructor(private _bookService: BookService, private _activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRouter.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  listBooks(){
      const hasCategoryId: boolean =this._activatedRouter.snapshot.paramMap.has('id');
if(hasCategoryId){
  this.currentCategoryId = +this._activatedRouter.snapshot.paramMap.get('id');
}else{
  this.currentCategoryId = 1;
}
      

    this._bookService.getbooks(this.currentCategoryId).subscribe(
      data=> this.books = data
    )
  }


}

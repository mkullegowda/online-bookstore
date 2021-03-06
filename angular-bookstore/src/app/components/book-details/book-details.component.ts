import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();


  constructor(private _activetedRouter: ActivatedRoute, private _bookService: BookService) { }

  ngOnInit() {
    this._activetedRouter.paramMap.subscribe(
      ()=> {
        this.getBookInfo();
      })

  }

getBookInfo(){
  const id: number = +this._activetedRouter.snapshot.paramMap.get('id');
  this._bookService.get(id).subscribe(
    data => {
    this.book=data;
    }
  )
}

}

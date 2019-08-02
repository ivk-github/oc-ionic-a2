import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BookModel } from 'src/app/models/book-model';

import { MediasService } from 'src/app/services/medias.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.page.html',
  styleUrls: ['./books-list.page.scss'],
})
export class BooksListPage implements OnInit, OnDestroy {

  booksSubscription: Subscription;
  booksList: BookModel[];

  constructor(private mediasService: MediasService) { }

  ngOnInit() {
    this.booksSubscription = this.mediasService.booksList$.subscribe(
      (booksList: BookModel[]) => {
        this.booksList = booksList.slice();
      }
    );
    this.mediasService.emitBooks();
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

  async onDisplayLendBook(bookId: number) {
    console.log("onDisplayLendBook - bookId : " + bookId);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';

import { BookModel } from 'src/app/models/book-model';

import { MediasService } from 'src/app/services/medias.service';

import { LendBookPage } from '../lend-book/lend-book.page';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.page.html',
  styleUrls: ['./books-list.page.scss'],
})
export class BooksListPage implements OnInit, OnDestroy {

  booksSubscription: Subscription;
  booksList: BookModel[];

  constructor(private modalController: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private mediasService: MediasService) { }

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
    const modal = await this.modalController.create({
      component: LendBookPage,
      componentProps: {
        'bookId': bookId
      }
    });
    return await modal.present();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BookModel } from 'src/app/models/book-model';

import { MediasService } from 'src/app/services/medias.service';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.page.html',
  styleUrls: ['./lend-book.page.scss'],
})
export class LendBookPage implements OnInit {

  @Input() bookId: number;
  book: BookModel;

  constructor(private modalController: ModalController,
              private mediasService: MediasService) { }

  ngOnInit() {
    this.book = this.mediasService.booksList.find(book => book.id === this.bookId);
  }

  onDismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  onLend() {
    this.book.isLent = !this.book.isLent;
  }
}

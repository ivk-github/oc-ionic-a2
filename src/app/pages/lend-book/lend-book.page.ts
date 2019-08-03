import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';

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
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private mediasService: MediasService) { }

  ngOnInit() {
    this.book = this.mediasService.booksList.find(book => book.id === this.bookId);
  }

  onDismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async onLend() {
    /* Présentation du loader */
    let loader = await this.loadingCtrl.create({
      message: 'Sauvegarde en cours…'
    });
    loader.present();

    this.mediasService.isLentManager(this.book).then(
      async () => {
        /* Désactivation du loader */
        loader.dismiss();

        /* Présentation du toast */
        let toast = await this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      },
      async (error) => {
        loader.dismiss();
        let toast = await this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    );
  }
}

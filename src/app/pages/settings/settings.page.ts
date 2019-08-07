import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

import { MediasService } from 'src/app/services/medias.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private mediasService: MediasService) {}

  ngOnInit() {}

  async onLoadListsFromBackEnd() {
    /* Présentation du loader */
    let loader = await this.loadingCtrl.create({
      message: 'Chargement en cours…'
    });
    loader.present();

    this.mediasService.loadListsFromBackEnd().then(
      async (message: string) => {
        /* Sauvegarde sur le device */
        this.mediasService.saveListsOnDevice();

        /* Désactivation du loader */
        loader.dismiss();

        /* Présentation du toast */
        let toast = await this.toastCtrl.create({
          message: message,
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      },
      async (error) => {
        loader.dismiss();
        let toast = await this.toastCtrl.create({
          message: error,
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }
    );
  }

  async onSaveListsOnBackEnd() {
    /* Présentation du loader */
    let loader = await this.loadingCtrl.create({
      message: 'Sauvegarde en cours…'
    });
    loader.present();

    this.mediasService.saveListsOnBackEnd().then(
      async (message: string) => {
        /* Désactivation du loader */
        loader.dismiss();

        /* Présentation du toast */
        let toast = await this.toastCtrl.create({
          message: message,
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      },
      async (error) => {
        loader.dismiss();
        let toast = await this.toastCtrl.create({
          message: error,
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }
    );
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DiskModel } from 'src/app/models/disk-model';

import { MediasService } from 'src/app/services/medias.service';

@Component({
  selector: 'app-lend-disk',
  templateUrl: './lend-disk.page.html',
  styleUrls: ['./lend-disk.page.scss'],
})
export class LendDiskPage implements OnInit {

  @Input() diskId: number;
  disk: DiskModel;

  lendForm: FormGroup;

  constructor(private modalController: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private mediasService: MediasService) { }

  ngOnInit() {
    this.disk = this.mediasService.disksList.find(disk => disk.id === this.diskId);
    this.initForm();
  }

  initForm() {
    this.lendForm = this.formBuilder.group({
      borrower: ['', Validators.required],
      lendDate: ['', Validators.required]
    });
  }

  onDismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async onLend(lend: boolean) {
    /* Présentation du loader */
    let loader = await this.loadingCtrl.create({
      message: 'Sauvegarde en cours…'
    });
    loader.present();

    let borrower: string;
    let lendDate: string;

    if (lend) {
      borrower = this.lendForm.get('borrower').value;
      lendDate = this.lendForm.get('lendDate').value;
    } else {
      borrower = '';
      lendDate = '';
    }

    this.mediasService.isLentManager(this.disk, lend, borrower, lendDate).then(
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
        this.onDismissModal();
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

import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalController: ModalController,
              private mediasService: MediasService) { }

  ngOnInit() {
    this.disk = this.mediasService.disksList.find(disk => disk.id === this.diskId);
  }

  onDismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  onLend() {
    this.disk.isLent = !this.disk.isLent;
  }
}

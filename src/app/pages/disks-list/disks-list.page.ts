import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';

import { DiskModel } from 'src/app/models/disk-model';

import { MediasService } from 'src/app/services/medias.service';

import { LendDiskPage } from '../lend-disk/lend-disk.page';

@Component({
  selector: 'app-disks-list',
  templateUrl: './disks-list.page.html',
  styleUrls: ['./disks-list.page.scss'],
})
export class DisksListPage implements OnInit, OnDestroy {

  disksSubscription: Subscription;
  disksList: DiskModel[];

  constructor(private modalController: ModalController,
              private mediasService: MediasService) { }

  ngOnInit() {
    this.disksSubscription = this.mediasService.disksList$.subscribe(
      (disksList: DiskModel[]) => {
        this.disksList = disksList.slice();
      }
    );
    this.mediasService.emitDisks();
  }

  ngOnDestroy() {
    this.disksSubscription.unsubscribe();
  }

  async onDisplayLendDisk(diskId: number) {
    const modal = await this.modalController.create({
      component: LendDiskPage,
      componentProps: {
        'diskId': diskId
      }
    });
    return await modal.present();
  }
}

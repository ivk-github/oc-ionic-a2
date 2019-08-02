import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DiskModel } from 'src/app/models/disk-model';

import { MediasService } from 'src/app/services/medias.service';

@Component({
  selector: 'app-disks-list',
  templateUrl: './disks-list.page.html',
  styleUrls: ['./disks-list.page.scss'],
})
export class DisksListPage implements OnInit, OnDestroy {

  disksSubscription: Subscription;
  disksList: DiskModel[];

  constructor(private mediasService: MediasService) { }

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
    console.log("onDisplayLendDisk - diskId : " + diskId);
  }
}

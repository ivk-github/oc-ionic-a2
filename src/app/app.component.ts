import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let firebaseConfig = {
        apiKey: "AIzaSyBCrh4NB3sHQcFrodZiV5liB5cOoyfoqHY",
        authDomain: "ivk-oc-ionic-a2.firebaseapp.com",
        databaseURL: "https://ivk-oc-ionic-a2.firebaseio.com",
        projectId: "ivk-oc-ionic-a2",
        storageBucket: "",
        messagingSenderId: "389126851148",
        appId: "1:389126851148:web:563508f42c9722e4"
      };
      firebase.initializeApp(firebaseConfig);
    });
  }
}

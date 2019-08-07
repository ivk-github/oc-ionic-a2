import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  mode: string;
  authForm: FormGroup;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.mode = this.route.snapshot.paramMap.get('mode');
  }

  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.mode === 'signup') {
      this.authService.signUp(email, password).then(
        () => {
          this.navCtrl.navigateRoot('/tabs');
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else if (this.mode === 'signin') {
      this.authService.signIn(email, password).then(
        () => {
          this.navCtrl.navigateRoot('/tabs');
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}

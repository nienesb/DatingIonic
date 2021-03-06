import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };


  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        console.log(allowed);

      setTimeout(() => {
        this.loading.dismiss();
        this.nav.setRoot(HomePage);
      }, 1000);

      },
      error => {
        this.showError("Login mislukt.");
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Gegevens controleren...',
      //dismissOnPageChange: true,
      spinner: 'ios'
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}

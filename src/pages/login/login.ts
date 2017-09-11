import { Client } from "../../services/rest/client";
import { AlertController, NavController } from "ionic-angular";
import { HomePage } from "../home/home";
import { Component, OnInit } from "@angular/core";
import { UserSession } from "../../app/usersession";
import { FingerprintService } from "../../fingerprint/login/fingerprint-service";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  constructor(private client: Client,
              private navCtrl: NavController,
              private userSession: UserSession,
              private alertCtrl: AlertController,
              private fingerprintService: FingerprintService) {
  }

  private username: string;
  private password: string;

  login() {
    console.log('Theoretically logging in as ' + this.username);
    this.client.login(this.username, this.password).subscribe(data => {
      console.log('Managed to log in');
      this.fingerprintService.storeCredentials(this.username, this.password).then(result => {
        console.log('Stored fingerprint');
        this.userSession.customerNumber = this.username;
        this.navCtrl.setRoot(HomePage);
      }).catch(error => {
        console.log('User decided not to capture fingerprint')
        this.userSession.customerNumber = this.username;
        this.navCtrl.setRoot(HomePage);
      });
    }, err => {
      console.error('Login failed with error', err);
      let failureReason = 'Login failed for unknown reasons, please try again';
      if (err.status == 403)
        failureReason = 'Login failed due to invalid credentials, please try again';
      this.alertCtrl.create({
        title: 'Login failed!',
        subTitle: failureReason,
        buttons: ['OK']
      }).present();
    });
  }

  trigger() {
    this.ngOnInit();
  }

  clear() {
    this.fingerprintService.clear()
  }

  // clear state when we visit the login page (which we do after a logout)
  ngOnInit(): void {
    this.fingerprintService.hasFingerprint().then(hasFingerprint => {
      if (hasFingerprint) {
        this.fingerprintService.login().then(storedCreds => {
          this.client.login(storedCreds.username, storedCreds.password).subscribe(result => {
            this.userSession.customerNumber = storedCreds.username;
            this.navCtrl.setRoot(HomePage);
          });
        }).catch(error => {
          console.log('Could not login due to error', error);
        });
      }
    });
  }
}

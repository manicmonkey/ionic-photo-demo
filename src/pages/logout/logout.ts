import { Client } from "../../services/rest/client";
import { Component } from "@angular/core";
import { AlertController, Platform } from "ionic-angular";
import { UserSession } from "../../app/usersession";
import { FingerprintService } from "../../fingerprint/login/fingerprint-service";

@Component({
  templateUrl: 'logout.html'
})
export class LogoutPage {
  constructor(private client: Client,
              private fingerprintService: FingerprintService,
              private userSession: UserSession,
              private alertCtrl: AlertController,
              private platform: Platform) {
  }

  logout() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Continue logout?');
    alert.addInput({
      type: 'checkbox',
      label: 'Remember me',
      value: 'remember-me',
      checked: true
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Got result', data);
        if (data[0] != 'remember-me') {
          console.log('Clearing remember me');
          this.fingerprintService.clear();
        }
        this.client.logout().subscribe(data => {
          this.userSession.clear();
          this.platform.exitApp();
        });
      }
    });
    alert.present();
  }
}

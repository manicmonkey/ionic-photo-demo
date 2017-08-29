import {Client} from "../../services/rest/client";
import { AlertController, NavController } from "ionic-angular";
import {HomePage} from "../home/home";
import {Component, OnInit} from "@angular/core";
import {UserSession} from "../../app/usersession";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  constructor(private client: Client, private navCtrl: NavController, private userSession: UserSession, private alertCtrl: AlertController) {
  }

  private username: string;
  private password: string;

  login() {
    console.log('Theoretically logging in as ' + this.username);
    this.client.login(this.username, this.password).subscribe(data => {
      this.userSession.customerNumber = this.username;
      this.navCtrl.setRoot(HomePage);
    }, err => {
      console.log('Login failed with error', err);
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

  // clear state when we visit the login page (which we do after a logout)
  ngOnInit(): void {
    this.userSession.customerNumber = null;
    this.userSession.imageData = null;
  }
}

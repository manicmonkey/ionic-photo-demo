import {Client} from "../../services/rest/client";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {Component} from "@angular/core";
import {UserSession} from "../../app/usersession";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(private client: Client, private navCtrl: NavController, private userSession: UserSession) {
  }

  username: string;
  password: string;

  login() {
    console.log('Theoretically logging in as ' + this.username);
    this.client.login('admin', 'password');
    this.userSession.customerNumber = this.username;
    this.navCtrl.setRoot(HomePage);
  }
}

import {Client} from "../../services/rest/client";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {Component} from "@angular/core";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(private client: Client, private navCtrl: NavController) {
  }

  username: string;
  password: string;

  login() {
    console.log('Theoretically logging in as ' + this.username);
    this.client.login('admin', 'password');
    this.navCtrl.setRoot(HomePage);
  }
}

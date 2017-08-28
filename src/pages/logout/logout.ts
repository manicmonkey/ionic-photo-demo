import {Client} from "../../services/rest/client";
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'logout.html'
})
export class LogoutPage {
  constructor(private client: Client, private navCtrl: NavController) {
  }

  logout() {
    this.client.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}

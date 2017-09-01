import {Client} from "../../services/rest/client";
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { UserSession } from "../../app/usersession";

@Component({
  templateUrl: 'logout.html'
})
export class LogoutPage {
  constructor(private client: Client, private navCtrl: NavController, private userSession: UserSession) {
  }

  logout() {
    this.client.logout().subscribe(data => {
      this.userSession.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }
}

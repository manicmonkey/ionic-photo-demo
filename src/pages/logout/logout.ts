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
      const cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

      this.userSession.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }
}

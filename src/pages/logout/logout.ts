import {Client} from "../../services/rest/client";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'logout.html'
})
export class LogoutPage {
  constructor(private client: Client) {
  }

  logout() {
    this.client.logout()
  }
}

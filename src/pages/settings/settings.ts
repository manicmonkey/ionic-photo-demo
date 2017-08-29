import {Component} from "@angular/core";
import {UserSession} from "../../app/usersession";

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(private userSession: UserSession) {
  }
}

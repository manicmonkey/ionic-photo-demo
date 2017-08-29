import {Client} from "../../services/rest/client";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {Component, OnInit} from "@angular/core";
import {UserSession} from "../../app/usersession";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  constructor(private client: Client, private navCtrl: NavController, private userSession: UserSession) {
  }

  username: string;
  password: string;

  login() {
    console.log('Theoretically logging in as ' + this.username);
    this.client.login('admin', 'password').subscribe(data => {
      this.userSession.customerNumber = this.username;
      this.navCtrl.setRoot(HomePage);
    });
  }

  // clear state when we visit the login page (which we do after a logout)
  ngOnInit(): void {
    this.userSession.customerNumber = null;
    this.userSession.imageData = null;
  }
}

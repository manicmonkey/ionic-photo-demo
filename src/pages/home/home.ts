import {Component, OnInit} from '@angular/core';
import {Client} from "../../services/rest/client";
import {UserSession} from "../../app/usersession";
import { NavController } from "ionic-angular";
import { CameraPage } from "../camera/camera";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(private client: Client, private userSession: UserSession, private navCtrl: NavController) {
  }

  image: string;

  goToCamera() {
    console.log('Going to camera page');
    this.navCtrl.push(CameraPage);
  }

  ngOnInit(): void {
    this.client.loadDocumentByCuk('photo-' + this.userSession.customerNumber).subscribe(data => {
      const id = data[0]['properties']['id'];
      const rev = data[0]['properties']['revision'];
      this.image = this.userSession.baseUrl + '/rest/v1/documents/by-id/' + id + '/' + rev + '/file';
    }, err => {
      console.log('Could not load customer photo');
    });
  }
}

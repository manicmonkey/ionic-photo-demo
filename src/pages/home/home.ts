import {Component, OnInit} from '@angular/core';
import {Client} from "../../services/rest/client";
import {UserSession} from "../../app/usersession";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(private client: Client, private userSession: UserSession) {
  }

  image: string;

  private baseUrl = 'http://192.168.1.2';

  ngOnInit(): void {
    const docObs = this.client.loadDocumentByCuk('photo-' + this.userSession.customerNumber);

    docObs.subscribe(data => {
      const id = data[0]['properties']['id'];
      const rev = data[0]['properties']['revision'];
      this.image = this.baseUrl + '/rest/v1/documents/by-id/' + id + '/' + rev + '/file';
    }, err => {
      console.log('Could not load customer photo');
    });
  }
}

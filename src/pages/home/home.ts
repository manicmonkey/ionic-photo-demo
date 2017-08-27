import {Component, OnInit} from '@angular/core';
import {Client} from "../../services/rest/client";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(private client: Client) {
  }

  image: string;

  ngOnInit(): void {
    this.client.loadDocumentByCuk('photo-234', data => {
      this.image = data;
    })
  }
}

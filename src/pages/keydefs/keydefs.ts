import {Component} from "@angular/core";
import {Client, KeyDef} from "../../services/rest/client";

@Component({
  selector: 'page-keydefs',
  templateUrl: 'keydefs.html'
})
export class KeyDefsPage {
  constructor(public client: Client) {
  // constructor() {
    console.log('gooo');

  }

  keyDefs: KeyDef[];

  login() {
    this.client.login();
  }

  loadKeyDefs() {
    this.client.loadKeyDefs().subscribe(data => {
      // Read the result field from the JSON response.
      console.log('choo choo');
      // data.forEach(d => d.name)
      this.keyDefs = data;
    });
  }

  logout() {
    this.client.logout();
    this.keyDefs = null;
  }
}

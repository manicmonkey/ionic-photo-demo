import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface KeyDef {
  name: String;
  label: String;
  dataType: String;
  // some more...
}

@Injectable()
export class Client {
  constructor(public httpClient: HttpClient) {
  }

  login() {
    console.log('Logging in');
    const creds = {
      'username': 'admin',
      'password': 'password'
    };
    this.httpClient.post('/rest/v1/sessions', creds).subscribe();
  }

  loadKeyDefs() {
    console.log('Retrieving key defs');
    return this.httpClient.get<KeyDef[]>('/rest/v1/key-defs');
  }

  logout() {
    console.log('Logging out');
    this.httpClient.delete('/rest/v1/sessions').subscribe()
  }
}

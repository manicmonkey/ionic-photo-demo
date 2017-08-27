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

  createDocument(data: string) {
    var doc = {
      keys: {},
      documentDef: 'photo'
    };
    const form = new FormData();
    form.append('document', new Blob([JSON.stringify(doc)], { type: 'application/json' }));
    // form.set('document', 'photo');
    form.set('extension', 'jpg');
    form.set('file', this.getData(data));
    // form.set('file', new Blob([data], { type: 'image/jpeg' }));
    this.httpClient.post('/rest/v1/documents', form).subscribe();
  }

  private getData(data: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString = atob(data);

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: 'image/jpeg'});
  };

  loadKeyDefs() {
    console.log('Retrieving key defs');
    return this.httpClient.get<KeyDef[]>('/rest/v1/key-defs');
  }

  logout() {
    console.log('Logging out');
    this.httpClient.delete('/rest/v1/sessions').subscribe()
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface KeyDef {
  name: String;
  label: String;
  dataType: String;
  // some more...
}

export interface Document {
  documentDef: string,
  keys: object,
  customerUniqueKey?: string,
}

export class BlobBuilder {
  static dataURItoBlob(dataURI: string): Blob {
    // convert base64/URLEncoded data component to raw binary data held in a string
    // http://stackoverflow.com/a/5100158/907388
    // inspired this pollyfill: https://github.com/blueimp/JavaScript-Canvas-to-Blob
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0){
      byteString = atob(dataURI.split(',')[1]);
    } else{
      byteString = decodeURI(dataURI.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }
}

@Injectable()
export class Client {
  constructor(public httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    console.log('Logging in');
    const creds = {
      'username': username,
      'password': password
    };
    this.httpClient.post('/rest/v1/sessions', creds).subscribe();
  }

  createDocument(document: Document, file?: {extension: string, data: Blob}) {
    const form = new FormData();
    form.append('document', new Blob([JSON.stringify(document)], { type: 'application/json' }));
    //todo check value provided
    form.set('extension', file.extension);
    form.set('file', file.data);
    this.httpClient.post('/rest/v1/documents', form).subscribe();
  }

  loadKeyDefs() {
    console.log('Retrieving key defs');
    return this.httpClient.get<KeyDef[]>('/rest/v1/key-defs');
  }

  logout() {
    console.log('Logging out');
    this.httpClient.delete('/rest/v1/sessions').subscribe()
  }

  loadDocumentByCuk(customerUniqueKey: string, callback: (url: string) => void) {
    this.httpClient.get('/rest/v1/documents/by-cuk/' + customerUniqueKey).subscribe(data => {
      const id = data[0]['properties']['id'];
      const rev = data[0]['properties']['revision'];
      callback('/rest/v1/documents/by-id/' + id + '/' + rev + '/file')
    });
  }
}

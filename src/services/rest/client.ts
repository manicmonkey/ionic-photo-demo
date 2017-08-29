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

  private baseUrl = 'http://192.168.1.2';

  private errorHandler = (err) => {
    console.error('Error happened!', err)
  };

  private options = { withCredentials: true };

  login(username: string, password: string) {
    console.log('Logging in');
    const creds = {
      'username': username,
      'password': password
    };
    return this.httpClient.post(this.baseUrl + '/rest/v1/sessions', creds, this.options);
  }

  createDocument(document: Document, file?: {extension: string, data: Blob}) {
    const form = new FormData();
    form.append('document', new Blob([JSON.stringify(document)], { type: 'application/json' }));
    //todo check value provided
    form.set('extension', file.extension);
    form.set('file', file.data);
    this.httpClient.post(this.baseUrl + '/rest/v1/documents', form, this.options).subscribe(() => {}, this.errorHandler);
  }

  loadKeyDefs() {
    console.log('Retrieving key defs');
    return this.httpClient.get<KeyDef[]>(this.baseUrl + '/rest/v1/key-defs', this.options);
  }

  logout() {
    console.log('Logging out');
    this.httpClient.delete(this.baseUrl + '/rest/v1/sessions', this.options).subscribe()
  }

  loadDocumentByCuk(customerUniqueKey: string) {
    return this.httpClient.get(this.baseUrl + '/rest/v1/documents/by-cuk/' + customerUniqueKey, this.options);
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { UserSession } from "../../app/usersession";

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
  properties?: {id: number}
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
  constructor(public httpClient: HttpClient, private userSession: UserSession) {
  }

  private options = { withCredentials: true };

  login(username: string, password: string) {
    console.log('Logging in');
    const creds = {
      'username': username,
      'password': password
    };
    return this.httpClient.post(this.userSession.baseUrl + '/sessions', creds, this.options);
  }

  getSession() {
    return this.httpClient.get(this.userSession.baseUrl + '/sessions?current=true', this.options);
  }

  createDocument(document: Document, file?: {extension: string, data: Blob}) {
    const form = new FormData();
    form.append('document', new Blob([JSON.stringify(document)], { type: 'application/json' }));
    if (file) {
      form.set('extension', file.extension);
      form.set('file', file.data);
    }
    return this.httpClient.post(this.userSession.baseUrl + '/documents', form, this.options);
  }

  updateDocument(document: Document, file?: {extension: string, data: Blob}) {
    const form = new FormData();
    form.append('document', new Blob([JSON.stringify(document)], { type: 'application/json' }));
    if (file) {
      form.set('extension', file.extension);
      form.set('file', file.data);
    }
    return this.httpClient.put(this.userSession.baseUrl + '/documents/by-id/' + document.properties.id, form, this.options);
  }

  loadKeyDefs() {
    console.log('Retrieving key defs');
    return this.httpClient.get<KeyDef[]>(this.userSession.baseUrl + '/key-defs', this.options);
  }

  logout() {
    console.log('Logging out');
    return this.httpClient.delete(this.userSession.baseUrl + '/sessions', this.options);
  }

  loadDocumentByCuk(customerUniqueKey: string) {
    return this.httpClient.get<Document>(this.userSession.baseUrl + '/documents/by-cuk/' + customerUniqueKey + '?current=true', this.options);
  }
}

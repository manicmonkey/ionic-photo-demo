export class UserSession {

  customerNumber: string;

  imageData: string;

  baseUrl: string = 'http://192.168.1.4/rest/v1';

  clear() {
    this.customerNumber = null;
    this.imageData = null;
  }
}

import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {BlobBuilder, Client, Document} from "../../services/rest/client";
import {UserSession} from "../../app/usersession";
import { ToastController } from "ionic-angular";

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  constructor(private camera: Camera, private client: Client, private userSession: UserSession, private toastCtrl: ToastController) {
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection: this.camera.Direction.FRONT
  };

  takePicture() {
    const installed = Camera.installed();
    console.log("installed: " + installed);
    this.camera.getPicture(this.options).then((imageData) => {
      console.log("Got picture");
      // this.userSession.image = imageData;
      this.userSession.imageData = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Got error", err)
    });
  }

  private successHandler(data) {
    console.log('Request completed successfully', data);
    this.renderToast('Photo uploaded successfully!');
  }

  private errorHandler = (err) => {
    console.error('Error happened!', err);
    this.renderToast('Error uploading photo!');
  };

  private renderToast(message: string) {
    if (!this.toastCtrl) {
      console.log('Toast not available');
      return;
    }
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

  upload() {
    console.log("Uploading with customer number: " + this.userSession.customerNumber);

    this.client.loadDocumentByCuk('photo-' + this.userSession.customerNumber).subscribe(data => {
      console.log('Found document by cuk', data);
      const doc = data[0];
      const fileData = BlobBuilder.dataURItoBlob(this.userSession.imageData);
      this.client.updateDocument(doc, { extension: 'jpg', data: fileData }).subscribe(this.successHandler, this.errorHandler);
    }, err => {
      console.log('Could find existing photo (really should check for 404)', err);
      const data = BlobBuilder.dataURItoBlob(this.userSession.imageData);
      const doc: Document = {
        documentDef: 'photo',
        keys: {
          'customer-number': this.userSession.customerNumber
        },
        customerUniqueKey: 'photo-' + this.userSession.customerNumber
      };
      this.client.createDocument(doc, { extension: 'jpg', data: data }).subscribe(this.successHandler, this.errorHandler);
    });
  }
}

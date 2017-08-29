import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {BlobBuilder, Client, Document} from "../../services/rest/client";
import {UserSession} from "../../app/usersession";

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  constructor(private camera: Camera, private client: Client, private userSession: UserSession) {
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

  upload() {
    console.log("Uploading with customer number: " + this.userSession.customerNumber);

    const data = BlobBuilder.dataURItoBlob(this.userSession.imageData);
    const doc: Document = {
      documentDef: 'photo',
      keys: {
        'customer-number': this.userSession.customerNumber
      },
      customerUniqueKey: 'photo-' + this.userSession.customerNumber
    };
    this.client.createDocument(doc, { extension: 'jpg', data: data });
  }
}

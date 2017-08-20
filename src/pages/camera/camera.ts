import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  constructor(public navCtrl: NavController, private camera: Camera) {

  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection: this.camera.Direction.FRONT
  };

  imageData: String;

  takePicture() {
    const installed = Camera.installed();
    console.log("installed: " + installed);
    this.camera.getPicture(this.options).then((imageData) => {
      console.log("Got picture");
      this.imageData = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Got error", err)
    });
  }
}

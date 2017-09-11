import { Platform } from "ionic-angular";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

@Injectable()
export class FingerprintService {
  constructor(private fingerPrintAuth: AndroidFingerprintAuth,
              private platform: Platform,
              private storage: Storage) {
  }

  private clientId = 'ionic-baxters-bank-demo';

  hasFingerprint(): Promise<boolean> {
    return this.getLoginDetails()
      .then(_ => {
        return true;
      })
      .catch(_ => {
        return false;
      });
  }

  // see if this can return username
  // login(): Promise<{ success: boolean, username?: string }> {
  //   return this.getLoginDetails().then(details => {
  //     return this.fingerPrintAuth.decrypt({
  //       clientId: this.clientId,
  //       username: details.username,
  //       token: details.token
  //     }).then(result => {
  //       return Promise.resolve({
  //         success: true,
  //         username: details.username
  //       });
  //     }).catch(error => {
  //       return Promise.resolve({
  //         success: false
  //       })
  //     })
  //   });
  // }

  login(): Promise<{ username: string, password: string }> {
    return this.platform.ready().then(ready => {
      console.log('Platform ready', ready);
      return this.getLoginDetails()
    }).then(details => {
      console.log('Got login details', details);
      return this.fingerPrintAuth.decrypt({
        clientId: this.clientId,
        username: details.username,
        token: details.token,
        disableBackup: true
      }).then(result => {
        console.log('Decrypted result', result);
        return {
          username: details.username,
          password: result.password
        };
      }).catch(error => {
        return Promise.reject('User cancelled or something');
      });
    });
  }

  storeCredentials(username: string, password: string) {
    console.log('Storing credentials [' + username + ', ' + password + ']');
    return this.fingerPrintAuth.encrypt({
      clientId: this.clientId,
      username: username,
      password: password,
      disableBackup: true,
      dialogMessage: 'Use fingerprint to remember login'
    }).then(encryptionResult => {
      console.log('Encrypted credentials', encryptionResult);
      this.storage.ready().then(ready => {
        console.log('Storing encryption token');
        this.storage.set('username', username);
        this.storage.set('token', encryptionResult.token);
      })
    });
  }

  clear() {
    console.log('Clearing fingerprint details');
    this.getLoginDetails().then(creds => {
      this.fingerPrintAuth.delete({
        clientId: this.clientId,
        username: creds.username
      }).then(result => {
        console.log('Deleted', result);
      })
    });
  }

  private getLoginDetails(): Promise<{ username: string, token: string }> {
    return this.storage.ready().then(value => {
      return Promise.all([
        value.getItem('username'),
        value.getItem('token')
      ]);
    }).then(values => {
      return {username: values[0], token: values[1]};
    });
  }
}

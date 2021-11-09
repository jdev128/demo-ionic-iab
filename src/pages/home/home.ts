import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  environment: string;

  devURL = 'https://app-socios-frontend-jmmsnlcpta-uc.a.run.app';
  testURL = 'https://app-socios-frontend-zrvedpo66q-uc.a.run.app/';
  prodURL = 'https://asistenciamedica.osde.com.ar/';
  localURL = 'http://192.168.0.1:8100';

  params: string;

  private browser;

  constructor(public navCtrl: NavController, public iab: InAppBrowser) {

  }

  openBrowser() {
    let host;
    switch (this.environment) {
      case 'dev':
        host = this.devURL;
        break;
      case 'test':
        host = this.testURL;
        break;
      case 'prod':
        host = this.prodURL;
        break;
      default:
        host = this.localURL
    }
    let url = this.params? host + "/tabs/inicio?code=" + this.params : host;
    this.browser = this.iab.create(url, "_blank", "location=no");
    this.browser.on("message").subscribe(message => {
      if (message.data && message.data) {
          if (message.data.event === "close") {
            this.browser.close();
          } else if (message.data.event === "phone") {
            window.open("tel:" + message.data.data.number, "_self");
          } else if (message.data.event === "whatsapp") {
            window.open("https://wa.me/" + message.data.data.number, '_self');
          }
    }});
  }

}

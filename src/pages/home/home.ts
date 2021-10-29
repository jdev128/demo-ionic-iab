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
  localURL = 'http://192.168.0.1:8100';

  params: string;

  private browser;

  constructor(public navCtrl: NavController, public iab: InAppBrowser) {

  }

  openBrowser() {
    let host = this.environment === 'dev'? this.devURL : this.localURL;
    let url = this.params? host + "/tabs/inicio?" + this.params : host;
    this.browser = this.iab.create(url, "_blank", "location=no");
    this.browser.on("message").subscribe(message => {
      if (message.data && message.data) {
          if (message.data.event === "close") {
            this.browser.close();
          } else if (message.data.event === "phone") {
            window.open("tel:" + message.data.data.number, "_system");
          } else if (message.data.event === "whatsapp") {
            window.open("whatsapp://send?phone=" + message.data.data.number);
          }
    }});
  }

}

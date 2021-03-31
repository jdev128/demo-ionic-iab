import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  params= "";
  private browser;

  constructor(public navCtrl: NavController, public iab: InAppBrowser) {

  }

  openBrowser() {
    this.browser = this.iab.create("http://192.168.0.4:8100/tabs/inicio"+this.params, "_blank", "location=no");
    this.browser.on("message").subscribe(message => {
      if (message.data && message.data) {
          if (message.data.event === "close") {
            this.browser.close();
          } else if (message.data.event === "phone") {
            window.open("tel:" + message.data.data.number, "_system");
          } else if (message.data.event === "whatsapp") {
            window.open("whatsapp://send?phone=" + message.data.data.number, "_system");
          }
    }});
  }

}

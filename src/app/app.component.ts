import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";
import { SQLite } from "@ionic-native/sqlite";
import { Servicio1Provider } from '../providers/servicio1/servicio1';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(
    public sqlite: SQLite,
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public Servicio1Provider: Servicio1Provider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.createDatabase();
    });
  }

  private createDatabase() {
    this.sqlite
      .create({
        name: "bimbo.db",
        location: "default" // the location field is required
      })
      .then(db => {
        console.log(db);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

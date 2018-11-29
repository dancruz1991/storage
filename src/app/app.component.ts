import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { SQLite } from "@ionic-native/sqlite";
import { Servicio1Provider } from '../providers/servicio1/servicio1';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public servicio1: Servicio1Provider,
    public sqlite: SQLite
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
        this.servicio1.setDatabase(db);
        return this.servicio1.createTable();
      })
      .then(() =>{
        this.splashScreen.hide();
        this.rootPage = 'HomePage';
      })
      .catch(error =>{
        console.error(error);
      });
  }
}

import { Injectable } from "@angular/core";
import { SQLiteObject } from "@ionic-native/sqlite";

/*
  Generated class for the Servicio1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Servicio1Provider {
  db: SQLiteObject = null;

  constructor() {
    console.log("Hello Servicio1Provider Provider");
  }
  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  create(task: any) {
    let sql = "INSERT INTO tasks(title, completed) VALUES(?,?)";
    return this.db.executeSql(sql, [task.title, task.completed]);
  }
  createTable() {
    let sql =
      "CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)";
    return this.db.executeSql(sql, []);
  }

  getAll() {
    let sql = "SELECT * FROM tasks";
    return this.db
      .executeSql(sql, [])
      .then(response => {
        let tasks = [];
        for (let index = 0; index < response.rows.length; index++) {
          tasks.push(response.rows.item(index));
        }
        return Promise.resolve(tasks);
      })
      .catch(error => Promise.reject(error));
  }


  update(task: any) {
    let sql = "UPDATE tasks SET title=?, completed=? WHERE id=?";
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

  delete(task: any) {
    let sql = "DELETE FROM tasks WHERE id=?";
    return this.db.executeSql(sql, [task.id]);
  }
}

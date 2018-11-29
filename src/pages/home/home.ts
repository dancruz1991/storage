import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { Servicio1Provider } from "../../providers/servicio1/servicio1";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  tasks: any[] = [];

  constructor(
    public navCtrl: NavController,
    public Servicio: Servicio1Provider,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.Servicio.getAll()
      .then(tasks => {
        this.tasks = tasks;
      })
      .catch(error => {
        console.error(error);
      });
  }
  openAlertNewTask() {
    let alert = this.alertCtrl.create({
      title: "Crear tarea",
      message: "escribe el nombre de la tarea",
      inputs: [
        {
          name: "title",
          placeholder: "Digitar nueva tarea."
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("cancelar");
          }
        },
        {
          text: "Crear",
          handler: data => {
            data.completed = false;
            this.Servicio.create(data)
              .then(response => {
                this.tasks.unshift(data);
              })
              .catch(error => {
                console.error(error);
              });
          }
        }
      ]
    });
    alert.present();
  }

  updateTask(task, index) {
    task = Object.assign({}, task);
    task.completed = !task.completed;
    this.Servicio.update(task)
      .then(response => {
        this.tasks[index] = task;
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteTask(task: any, index) {
    this.Servicio.delete(task)
      .then(response => {
        console.log(response);
        this.tasks.splice(index, 1);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

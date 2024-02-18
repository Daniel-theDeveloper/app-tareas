import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { SelectedTaskService } from '../services/selected-task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  tasks: any;
  loadpage: boolean = true;
  developMode: boolean = false;
  isNone: boolean = false;
  lowPriority: any[] = ["cargando"];
  mediumPriority: any[] = ["cargando"];
  highPriority: any[] = ["cargando"];

  constructor(
    private database: DatabaseService,
    private selectedTask: SelectedTaskService,
    private navCtrl: NavController
    ) {}

  async ngOnInit() {
    this.loadpage = true;
    await this.database.initializPlugin().then((res: any) => {
      if (res) {
        console.log("Base de datos creada");
        this.tasks = this.database.getTasks();
        this.loadTasks();
        this.countAllTask();
      } else {
        console.log("Base de datos no creada");
        if (this.database.developMode) {
          this.developMode = true;
          this.tasks = undefined;
        }
      }
    });
    this.loadpage = false;
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      if (this.developMode == false) {
        this.loadTasks();
      } else {
        if (this.loadpage) {
          console.log("Carga infinita desactivada");
          this.loadpage = false;
        } else {
          console.log("Carga infinita activada");
          this.loadpage = true;
        }
      }
      event.target.complete();
    }, 1000);
  }

  async loadTasks() {
    this.loadpage = true;
    await this.database.loadTasks();
    this.tasks = this.database.getTasks();
    console.log("Datos cargados") //borrar esto
    if (this.tasks()[0] == undefined) {
      this.isNone = true;
    } else {
      this.isNone = false;
    }
    console.log("Vacia? ", this.isNone) //borrar esto
    this.loadpage = false;
  }

  async countAllTask() {
    await this.database.countTaskByPriority().then(() => {
      this.lowPriority = this.database.getTaskCount1();
      this.mediumPriority = this.database.getTaskCount2();
      this.highPriority = this.database.getTaskCount3();
    });
  }

  actionEvent(id: any) {
    this.selectedTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/details-task');
  }
}

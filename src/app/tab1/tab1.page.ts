import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { SelectedTaskService } from '../services/selected-task.service';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  today: string = "";
  tasks: any;
  loadPage: boolean = true;
  developMode: boolean = false;
  isNone: boolean = true;
  lowPriority: any[] = ["cargando"];
  mediumPriority: any[] = ["cargando"];
  highPriority: any[] = ["cargando"];

  constructor(
    private database: DatabaseService,
    private selectedTask: SelectedTaskService,
    private navCtrl: NavController,
    private dates: DatesService,
  ) {}

  async ngOnInit() {
    this.loadPage = true;

    this.today = this.dates.getTodayDate();
    await this.database.initializePlugin().then((res: any) => {
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
    this.loadPage = false;
  }

  // Función de recargar la pagina
  handleRefresh(event: any) {
    setTimeout(() => {
      if (!this.developMode) {
        this.loadTasks();
        this.countAllTask();
      }
      // else
      // {
      //   if (this.loadPage) {
      //     console.log("Carga infinita desactivada");
      //     this.loadPage = false;
      //   } else {
      //     console.log("Carga infinita activada");
      //     this.loadPage = true;
      //   }
      // }
      event.target.complete();
    }, 1000);
  }

  // Función de carga de las areas
  async loadTasks() {
    this.loadPage = true;

    //Cargando datos
    await this.database.loadTaskDate(this.today);
    this.tasks = this.database.getSelectedTask();

    //Verificando si esta vació
    if (this.tasks()[0] == undefined) {
      this.isNone = true;
    } else {
      this.isNone = false;
    }
    this.loadPage = false;
  }

  async countAllTask() {
    await this.database.countTaskByPriority(this.today).then(() => {
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

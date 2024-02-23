import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { SelectedTaskService } from '../services/selected-task.service';
import { DatesService } from '../services/dates.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  today: string = "";
  tasks: any;
  loadpage: boolean = true;
  developMode: boolean = false;
  isNone: boolean = false;
  lowPriority: any[] = ["cargando"];
  mediumPriority: any[] = ["cargando"];
  highPriority: any[] = ["cargando"];
  selectedLanguaje = "en";

  constructor(
    private database: DatabaseService,
    private selectedTask: SelectedTaskService,
    private navCtrl: NavController,
    private dates: DatesService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang(this.selectedLanguaje);
    this.translateService.use(this.selectedLanguaje);
  }

  async ngOnInit() {
    this.loadpage = true;

    this.today = this.dates.getTodayDate();
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
        this.countAllTask();
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

    //Cargando datos
    await this.database.loadTaskDate(this.today);
    this.tasks = this.database.getSelectedTask();

    //Verifiicando si esta vacio
    if (this.tasks()[0] == undefined) {
      this.isNone = true;
    } else {
      this.isNone = false;
    }
    this.loadpage = false;
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

import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { SelectedTaskService } from '../services/selected-task.service';
import { NavController } from '@ionic/angular';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public datetime: any;
  tasks: any;
  loadpage: boolean = true;
  isNone: boolean = false;
  developMode = false;
  opciones: any;

  descriptionTest: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta.";

  constructor(
    private selectedTask: SelectedTaskService,
    private database: DatabaseService,
    private navCtrl: NavController,
    private dates: DatesService
  ) { }

  ngOnInit() {
    if (this.database.developMode == false) {
      this.developMode = false;
     this.isNone = true; //Borrar esto
     this.getTodayTask();
    } else {
      this.developMode = true;
    }
  }

  async getTodayTask() {
    let today = this.dates.getTodayDate();
    
    if (this.developMode == false) {
      this.loadpage = true;
      await this.database.loadTaskDate(today);
      this.tasks = this.database.getSelectedTask();
      if (this.tasks()[0] == undefined) {
        this.isNone = true;
      } else {
        this.isNone = false;
      }
      this.loadpage = false;
    }
  }

  async getDate(date: any) {
    let fechaSeleccionada = date.detail.value;
    let fechaSeparada = fechaSeleccionada.split('T');
    
    fechaSeleccionada = fechaSeparada[0];

    console.log('Fecha seleccionada: ', fechaSeleccionada);

    if (this.developMode == false) {
      this.loadpage = true;
      await this.database.loadTaskDate(fechaSeleccionada);
      this.tasks = this.database.getSelectedTask();
      if (this.tasks()[0] == undefined) {
        this.isNone = true;
      } else {
        this.isNone = false;
      }
      this.loadpage = false;
    }
  }

  details(id: number) {
    this.selectedTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/details-task');
  }
}

import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

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
    private database: DatabaseService
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
    let fullDate: any = new Date().toISOString();
    fullDate = fullDate.split('T');
    let today = fullDate[0];
    
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
}

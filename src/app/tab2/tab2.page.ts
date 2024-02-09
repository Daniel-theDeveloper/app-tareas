import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  /* ¿COMO SERA EL PROCESO PARA CAMBIAR LAS TAREAS POR FECHA
    SELECCIONADA?
    
    1- Cada vez que se precione una fecha en el calendario,
    se ejecutara un metodo.
    2- Ese metodo, recibira como parametro, la fecha seleccionada
    3- El metodo ejecutara una consulta a la base de datos donde
    seleccionara las tareas que coincidan con la fecha seleccionada
    4- Se actualizara el tablero con los nuevos datos
    */


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
      // this.getDate("2024-02-07");
     this.isNone = true; //Borrar esto
     this.getTodayTask();
    } else {
      this.getTodayTask(); //Borrar esto
      this.developMode = true;
    }
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

  async getTodayTask() {
    let fullDate: any = new Date().toISOString();
    fullDate = fullDate.split('T');
    let today = fullDate[0];
    
    if (this.developMode == false) {
      this.loadpage = true;
      await this.database.loadTaskDate(today);
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
  }

  async getDate(date: any) {
    let fechaSeleccionada = date.detail.value;
    let fechaSeparada = fechaSeleccionada.split('T');
    
    fechaSeleccionada = fechaSeparada[0];

    console.log('Fecha seleccionada: ', fechaSeleccionada);

    if (this.developMode == false) {
      this.loadpage = true;
      await this.database.loadTaskDate(fechaSeleccionada);
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
  }
}

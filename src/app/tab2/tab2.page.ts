import { Component, ViewChild } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public datetime: any;
  eventSource = [];
  viewTitle: string = "";

  calendar = {
    mode: "month" as CalendarMode,
    currentDate: new Date()
  }

  selectedDate!: Date;
  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  developmmentMode: boolean = true //Cambiar luego a false
  descriptionTest: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta.";

  constructor(
    private database: DatabaseService
  ) { }

  /* ¿COMO SERA EL PROCESO PARA CAMBIAR LAS TAREAS POR FECHA
    SELECCIONADA?
    
    1- Cada vez que se precione una fecha en el calendario,
    se ejecutara un metodo.
    2- Ese metodo, recibira como parametro, la fecha seleccionada
    3- El metodo ejecutara una consulta a la base de datos donde
    seleccionara las tareas que coincidan con la fecha seleccionada
    4- Se actualizara el tablero con los nuevos datos
    */

  ngOnInit() {}

  changeDay(day: any) {
    console.log("Cambiando fecha a: ", day) //borrar esto
  }
}

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
  developmmentMode: boolean = true //Cambiar luego a false
  descriptionTest: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta.";

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    const date = new Date();
    let dayChange = 0;

    // If the day we are going to set the value to
    // is in the previous month then set the day 2 days
    // later instead so it remains in the same month
    if (date.getDate() + dayChange <= 0) {
      dayChange = -dayChange;
    }

    // Set the value of the datetime to the day
    // calculated above
    date.setDate(date.getDate() + dayChange);
    this.datetime = date.toISOString();
  }
}

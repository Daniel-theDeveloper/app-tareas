import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public optionButtons = [
    {
      text: "Marcar como terminada",
      data: {
        action: "finish"
      }
    },
    {
      text: "Editar",
      data: {
        action: "edit"
      }
    },
    {
      text: "Cerrar",
      role: "cancel",
      data: {
        action: "cancel"
      }
    }
  ];

  constructor() { }

  actionEvent(e: any) {
    try {
      let ev: any = JSON.stringify(e.detail.data.action);
      console.log("Tarea terminada con: " + ev);
    } catch (e: any) {
      console.log("Cerrado forzado");
    }
  }

}

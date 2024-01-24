import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

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
  tasks: any;
  loadpage: boolean = true;

  constructor(private database: DatabaseService) {}

  async ngOnInit() {
    this.loadpage = true;
    await this.database.initializPlugin().then((res: any) => {
      if (res) {
        console.log("Base de datos creada");
        this.tasks = this.database.getTasks();
      } else {
        console.log("Base de datos no creada");
      }
    });
    this.loadTasks();
    this.loadpage = false;
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadTasks();
      event.target.complete();
    }, 1000);
  }

  async loadTasks() {
    this.loadpage = true;
    await this.database.loadTasks();
    this.tasks = this.database.getTasks();
    console.log("Datos actualizados:") //borrar esto
    console.log(this.tasks()[0].description) //borrar esto
    this.loadpage = false;
  }

  actionEvent(e: any, id: any) {
    try {
      let ev: any = JSON.stringify(e.detail.data.action);
      console.log("Tarea terminada con: " + ev);
      console.log("Para la tarea con id: " + id);
    } catch (e: any) {
      console.log("Cerrado forzado");
    }
  }
}

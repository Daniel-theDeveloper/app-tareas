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
        action: 1
      }
    },
    {
      text: "Editar",
      data: {
        action: 2
      }
    },
    {
      text: "Borrar",
      role: 'delete',
      data: {
        action: 3
      }
    },
    {
      text: "Cerrar",
      role: "cancel",
      data: {
        action: 4
      }
    }
  ];
  tasks: any;
  loadpage: boolean = true;
  developMode: boolean = false;
  isNone: boolean = false;
  taskFinishToast: boolean = false;
  taskDeleteToast: boolean = false;

  constructor(private database: DatabaseService) {}

  async ngOnInit() {
    this.loadpage = true;
    await this.database.initializPlugin().then((res: any) => {
      if (res) {
        console.log("Base de datos creada");
        this.tasks = this.database.getTasks();
        this.loadTasks();
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

  async finishTask(id: number, status: number) {
    await this.database.updateStatus(id, status).then((res: any) => {
      if (res) {
        this.taskFinishToast = true;
        console.log("Exito") //borrar esto
      } else {
        console.log("No exito") //borrar esto
      }
    });
  }

  async deleteTask(id: number) {
    await this.database.deleteTask(id).then((res: any) => {
      if (res) {
        this.taskDeleteToast = true;
        console.log("Exito") //borrar esto
      } else {
        console.log("No exito") //borrar esto
      }
    });
  }

  setOpen(isOpen: boolean) {
    this.taskFinishToast = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.taskDeleteToast = isOpen;
  }

  actionEvent(e: any, id: any) {
    try {
      let ev: any = JSON.stringify(e.detail.data.action);
      console.log("Tarea terminada con: " + ev);
      console.log("Para la tarea con id: " + id);
      if (ev == 1) {
        console.log("Seleccionado finish") //borrar esto
        this.finishTask(id, 2);
      } else if (ev == 2) {
        console.log("Selecciono editar");
      } else if (ev == 3) {
        console.log("Selecciono eliminar");
        this.deleteTask(id);
      } else {
        console.log("No se selecciono ninguna");
      }
    } catch (e: any) {
      console.log("Cerrado forzado");
    }
  }
}

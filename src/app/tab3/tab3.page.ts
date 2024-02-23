import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private languaje: number = 0;
  selectedLanguaje: string = "";
  isAlertOpen: boolean = false;
  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
    },
    {
      text: '¡Si!',
      role: 'confirm',
      handler: () => {
        this.deleteAll();
      },
    },
  ];

  constructor(
    private database: DatabaseService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (this.languaje == 0) {
      this.selectedLanguaje = "Español";
    } else if (this.languaje == 1) {
      this.selectedLanguaje = "English";
    } else {
      console.error("Configuracion invalida");
    }
  }

  clickMe(option: number) {
    if (option === 3) {
      this.isAlertOpen = true;
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  async deleteAll() {
    await this.database.deleteAllTask();
    const toast = await this.toastController.create({
      message: 'Todas las tareas fueron borradas, por favor reinicie la aplicacion',
      duration: 1500,
      position: 'bottom',
    });
    toast.present();
  }
}

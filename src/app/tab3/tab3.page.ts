import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  selectedLanguage = 'es';
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
    private toastController: ToastController,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

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

  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }
}

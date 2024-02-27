import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms'
import { DatabaseService } from '../../services/database.service';
import { DatesService } from '../../services/dates.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {
  today: any = Date.now();
  task = new FormGroup({
    title: new FormControl(''),
    priority: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    description: new FormControl('')
  });
  info: any;

  constructor(
    private location: Location,
    private toastController: ToastController,
    private database: DatabaseService,
    private dates: DatesService,
    private translation: TranslatePipe
    ) { }

  ngOnInit() {
  }

  async createTask() {
    const createMessage: string = this.translation.transform('FORMS.CREATE-SUCCESS');
    const messageErrorSQL: string = this.translation.transform('FORMS.MESSAGGE-ERROR-SQL');
    const messageErrorForm: string = this.translation.transform('FORMS.MESSAGGE-ERROR-FORM');

    this.info = this.task.value;
    let today = this.dates.getTodayDate();
    if (this.info.title != "" && this.info.priority != "" && this.info.date != "" && this.info.time != "" && this.info.description != "") {
      if (this.database.developMode == false) {
        try{
          await this.database.addTasks(this.info.title, 1, this.info.priority, this.info.date, this.info.time, this.info.description);
          const toast = await this.toastController.create({
            message: createMessage,
            duration: 1500,
            position: 'bottom',
          });
          await this.database.loadAll(today).then(() => {
            toast.present();
            this.location.back();
          });
        } catch (e: any) {
          const toast = await this.toastController.create({
            message: messageErrorSQL,
            duration: 1500,
            position: 'bottom',
          });
          await toast.present();
          console.error("Error en: ", e);
        }
      } else {
        console.log("Resultado:");
        console.log(this.info);
        this.location.back();
      }
    } else {
      const toast = await this.toastController.create({
        message: messageErrorForm,
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  goBack() {
    this.location.back();
  }
}

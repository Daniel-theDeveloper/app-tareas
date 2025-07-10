import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms'
import { DatabaseService } from '../../services/database.service';
import { DatesService } from '../../services/dates.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalNotifications } from '@capacitor/local-notifications';

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
    description: new FormControl(''),
    alarm: new FormControl(false),
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
    // Construyendo los mensajes de error, dependiendo del idioma del usuario
    const createMessage: string = this.translation.transform('FORMS.CREATE-SUCCESS');
    const messageErrorSQL: string = this.translation.transform('FORMS.MESSAGE-ERROR-SQL');
    const messageErrorForm: string = this.translation.transform('FORMS.MESSAGE-ERROR-FORM');

    // Proceso de guardado de la tarea
    this.info = this.task.value;
    let today = this.dates.getTodayDate();

    // Verificando si no hay campos vacíos
    if (this.info.title != "" && this.info.priority != "" && this.info.date != "" && this.info.time != "" && this.info.description != "") {
      // Verificando si no estas en la version web
      if (!this.database.developMode) {
        // Proceso de guardado en la base de datos
        let datetime = this.info.date + "T" + this.info.time;
        const res = await this.database.addTasks(this.info.title, 1, this.info.priority, datetime, this.info.description);

        // Verificación si el proceso se realizo correctamente
        if (res != null) {
          // Proceso de creación de la alarma, en caso de estar activada
          if (this.info.alarm) {
            await this.programmingAlarm(res, this.info, datetime);
          }

          // Creación de la notificación del éxito, al usuario
          const toast = await this.toastController.create({
            message: createMessage,
            duration: 1500,
            position: 'bottom',
          });

          // Salida de la pantalla
          await this.database.loadAll(today).then(() => {
            toast.present();
            this.location.back();
          });
        } else {
          const toast = await this.toastController.create({
            message: messageErrorSQL,
            duration: 1500,
            position: 'bottom',
          });
          await toast.present();
        }
      } else {
        // Developer mode:
        console.log("Resultado:");
        console.log(this.info);
        this.location.back();
      }
    } else {
      // Campos vacíos
      const toast = await this.toastController.create({
        message: messageErrorForm,
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  async programmingAlarm(taskId: any, info: any, datetime: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: taskId,
          title: info.title,
          body: info.description,
          schedule: { at: new Date(datetime) },
          actionTypeId: 'TASK_ACTIONS'
        }
      ]
    });

    LocalNotifications.addListener('localNotificationActionPerformed', async (event: any) => {
      const action = event.actionId;

      if (action === "finish") {
        const res = await this.database.finishTask(taskId);

        if (res) {
          console.log("Finalizado");
        } else {
          console.log("Algo salio mal...");
        }
      } else if (action === "postpone") {
        console.log("Proceso de finalización de la tarea");
      } else if (action === "tap") {
        console.log("Proceso en caso de presionar en la notificación en si");
      }
    })
  }

  goBack() {
    this.location.back();
  }
}

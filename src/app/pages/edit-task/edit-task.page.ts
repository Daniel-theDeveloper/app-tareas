import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms'
import { DatabaseService } from '../../services/database.service';
import { SelectedTaskService } from '../../services/selected-task.service'
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  private exit_text: string = this.traslation.transform('FORMS.EXIT');
  private return_text: string = this.traslation.transform('FORMS.RETURN');

  alertButtons = [
    {
      text: this.exit_text,
      role: 'confirm',
      handler: () => {
        this.location.back();
      },
    },
    {
      text: this.return_text,
      role: 'cancel'
    },
  ];
  taskSelected: any;
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
    private idTask: SelectedTaskService,
    private traslation: TranslatePipe
  ) { }

  ngOnInit() {
    this.info = this.task.value;
    if (this.database.developMode == false) {
      let id = this.idTask.getSelectedTask();
      this.loadTask(id).then((res: boolean) => {
        if (res) {
          const dateSQL = this.taskSelected()[0].datetime
          let datetime = dateSQL.split('T');
          this.info.title = this.taskSelected()[0].title;
          this.info.priority = this.taskSelected()[0].priority;
          this.info.date = datetime[0];
          this.info.time = datetime[1];
          this.info.description = this.taskSelected()[0].description;
          this.task.setValue(this.info);
        } else {
          console.error("Tarea numero " + id + " no fue encontrada");
        }
      });
    } else {
      this.info.title = "Tarea de prueba";
      this.info.priority = 1;
      this.info.date = "2024-02-01";
      this.info.time = "15:00";
      this.info.description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta.";
      this.task.setValue(this.info);
    }
  }

  async loadTask(id: number) {
    await this.database.loadTaskId(id);
    this.taskSelected = this.database.getIdTask();
    if (this.taskSelected()[0] != undefined) {
      return true
    } else {
      return false;
    }
  }

  async editTask() {
    const messageSuccess: string = this.traslation.transform('FORMS.EDIT-SUCCESS');
    const messageErrorSQL: string = this.traslation.transform('FORMS.MESSAGE-ERROR-SQL');
    const messageErrorForm: string = this.traslation.transform('FORMS.MESSAGE-ERROR-FORM');

    this.info = this.task.value;
    if (this.info.title != "" && this.info.priority != "" && this.info.date != "" && this.info.time != "" && this.info.description != "") {
      if (this.database.developMode == false) {
        try{
          let id = this.idTask.getSelectedTask();
          let datetime = this.info.date+"T"+this.info.time
  
          await this.database.updateTasks(id, this.info.title, 1, this.info.priority, datetime, this.info.description);
          const toast = await this.toastController.create({
            message: messageSuccess,
            duration: 1500,
            position: 'bottom',
          });
          await this.database.loadTaskId(id);
          await toast.present();
          this.location.back();
        } catch (e: any) {
          console.error(e);
          const toast = await this.toastController.create({
            message: messageErrorSQL,
            duration: 1500,
            position: 'bottom',
          });
          await toast.present();
          this.location.back();
        }
      } else {
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

}

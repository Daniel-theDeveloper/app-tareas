import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms'
import { DatabaseService } from '../../services/database.service';

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
    private database: DatabaseService
    ) { }

  ngOnInit() {
  }

  async createTask() {
    this.info = this.task.value;
    console.log(this.info);

    try{
      await this.database.addTasks(this.info.title, 1, this.info.priority, this.info.date, this.info.time, this.info.description).then((res: any) => {
        console.log("Resultado: ", res) //borrar esto
      });
      const toast = await this.toastController.create({
        message: 'Tarea creada con exito',
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
      this.location.back();
    } catch (e: any) {
      const toast = await this.toastController.create({
        message: 'Algo salio mal, por favor reportelo',
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
      console.error("Error en: ", e);
    }

  }

  goBack() {
    this.location.back();
  }
}

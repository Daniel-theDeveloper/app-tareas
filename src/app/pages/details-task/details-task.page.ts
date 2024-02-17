import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { SelectedTaskService } from '../../services/selected-task.service';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.page.html',
  styleUrls: ['./details-task.page.scss'],
})
export class DetailsTaskPage implements OnInit {
  developMode: boolean = true;
  tasks: any;

  constructor(
    private location: Location,
    private database: DatabaseService,
    private idTask: SelectedTaskService,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    if (this.database.developMode == false) {
      let id = this.idTask.getSelectedTask();

      await this.database.loadTaskId(id);
      this.tasks = this.database.getIdTask();
      this.developMode = false;
    } else {
      this.developMode = true;
    }
  }

  goBack() {
    this.location.back();
  }

  editTask(id: number) {
    this.idTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/edit-task');
  }

  async deleteTask(id: number) {
    await this.database.deleteTask(id);
    this.location.back();
  }

  async finishTask(id: number) {
    await this.database.updateStatus(id, 2);
    await this.database.loadTaskId(id);
    this.tasks = this.database.getIdTask();
  }

}

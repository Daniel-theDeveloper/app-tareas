import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { NavController } from '@ionic/angular';
import { SelectedTaskService } from '../services/selected-task.service';

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.page.html',
  styleUrls: ['./tap4.page.scss'],
})
export class Tap4Page implements OnInit {
  tasks: any;
  dates: any;
  loadpage: boolean = false;
  developMode: boolean = false;
  isNone: boolean = false;
  countTasks: any;
  res: any;
  detailsBlock: boolean = false;

  constructor(
    private database: DatabaseService,
    private selectedTask: SelectedTaskService,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    this.loadpage = true;
    if (this.database.developMode == false) {
      this.developMode = false;
      
      await this.database.loadOnlyDates();
      this.dates = this.database.getDates();

      if (this.dates()[0].date != undefined) {
        console.log("Existen datos");
        this.isNone = false;
        await this.database.loadTasks();
        this.tasks = this.database.getTasks();
      } else {
        this.isNone = true;
      }
    } else {
      this.developMode = true;
    }
    this.loadpage = false;
  }

  details(id: number) {
    this.selectedTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/details-task');
  }
}

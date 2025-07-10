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
  loadPage: boolean = true;
  developMode: boolean = false;
  isNone: boolean = true;
  countTasks: any;
  res: any;
  detailsBlock: boolean = false;

  constructor(
    private database: DatabaseService,
    private selectedTask: SelectedTaskService,
    private navCtrl: NavController,
  ) {}

  async ngOnInit() {
    if (!this.database.developMode) {
      
      await this.database.loadOnlyDates();
      this.dates = this.database.getDates();

      if (this.dates()[0] != undefined) {
        console.log("Existen datos");
        this.isNone = false;
        await this.database.loadTasks().then(() => {
          this.tasks = this.database.getTasks();
          this.developMode = false;
          this.loadPage = false;
          this.isNone = false;
        });
      } else {
        this.developMode = false;
        this.loadPage = false;
      }
    } else {
      this.isNone = false;
      this.developMode = true;
      this.loadPage = false;
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadPage = true;
      if (!this.developMode) {
        this.loadTasks();
      }
      event.target.complete();
    }, 1000);
  }

  async loadTasks() {
    await this.database.loadTasks();
    this.dates = this.database.getDates();

    if (this.dates()[0] != undefined) {
      console.log("Existen datos");
      this.isNone = false;
      await this.database.loadTasks().then(() => {
        this.tasks = this.database.getTasks();
        this.loadPage = false;
        this.isNone = false;
      });
    } else {
      this.loadPage = false;
    }

  }

  details(id: number) {
    this.selectedTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/details-task');
  }
}

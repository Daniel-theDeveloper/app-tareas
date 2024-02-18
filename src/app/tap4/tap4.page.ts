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
    console.log("1") //borrar esto
    this.loadpage = true;
    if (this.database.developMode == false) {
      console.log("2") //borrar esto
      
      await this.database.loadOnlyDates();
      this.dates = this.database.getDates();

      if (this.dates()[0].date != undefined) {
        console.log("3") //borrar esto
        console.log("Existen datos");
        this.isNone = false;
        await this.database.loadTasks().then(() => {
          console.log("4") //borrar esto
          this.tasks = this.database.getTasks();
          this.developMode = false;
          this.loadpage = false;
          console.log("5") //borrar esto
        });
      } else {
        this.isNone = true;
        this.developMode = false;
        this.loadpage = false;
      }
    } else {
      this.developMode = true;
      this.loadpage = false;
    }
  }

  details(id: number) {
    this.selectedTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/details-task');
  }
}

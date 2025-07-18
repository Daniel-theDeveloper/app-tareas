import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

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
  ) { }

  async ngOnInit() {
    if (!this.database.developMode) {

      await this.database.loadOnlyDates();
      this.dates = this.database.getDates();

      if (this.dates()[0] != undefined) {
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
      this.developMode = true;
      this.tasks = {
        id: 0,
        title: "Test Task",
        description: "This is a test task",
        datetime: new Date(),
        priority: 1,
        status: 1,
      };
      this.loadPage = false;
      this.isNone = false;
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
}

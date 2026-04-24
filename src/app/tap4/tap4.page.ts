import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Tasks } from '../interfaces/tasks';
import * as moment from 'moment';

interface GroupTasks {
  [date: string]: Tasks[];
}

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.page.html',
  styleUrls: ['./tap4.page.scss'],
})
export class Tap4Page implements OnInit {
  tasks: any;
  groupTasks: GroupTasks = {};
  groupDates: string[] = [];
  dates: any;
  loadPage: boolean = true;
  developMode: boolean = false;
  countTasks: any;
  res: any;
  detailsBlock: boolean = false;

  constructor(
    private database: DatabaseService
  ) { }

  async ngOnInit() {
    if (!this.database.developMode) {
      await this.database.loadTasks().then(() => {
        this.tasks = this.database.getTasks();

        if (this.tasks()[0] != undefined) {
          this.groupTasksFunction(this.tasks());

          this.developMode = false;
          this.loadPage = false;
        } else {
          this.developMode = false;
          this.loadPage = false;
        }
      });
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

  // Función para agrupar las tareas por fechas, y ordenadas por hora
  groupTasksFunction(task: any) {
    this.groupTasks = task.reduce((acc: any, task: any) => {
      // Conversion de la fecha ISO, a normal
      const dateISO = task.datetime;
      const date = dateISO.split('T')[0];

      // Comparación de fechas por tarea
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {} as GroupTasks);

    // Agrupación de fechas
    this.groupDates = Object.keys(this.groupTasks).sort((a: string, b: string) => {
      return moment(a).diff(moment(b));
    });

    // Organización de las tareas por la hora
    this.groupDates.forEach(date => {
      this.groupTasks[date].sort((a, b) => {
        return moment(a.datetime, 'HH:mm').diff(moment(b.datetime, 'HH:mm'));
      });
    });
  }

  async loadTasks() {
    await this.database.loadTasks();
    this.dates = this.database.getDates();

    if (this.dates()[0] != undefined) {
      console.log("Existen datos");
      await this.database.loadTasks().then(() => {
        this.tasks = this.database.getTasks();
        this.loadPage = false;
      });
    } else {
      this.loadPage = false;
    }

  }
}

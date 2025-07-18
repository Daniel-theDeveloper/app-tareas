import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public datetime: any;
  tasks: any;
  loadPage: boolean = true;
  isNone: boolean = true;
  developMode = false;
  opciones: any;
  resDate: any;

  highlightedDates = [
    {
      date: '2024-02-05',
      textColor: '#ffcb69',
      backgroundColor: '#2a2511',
    },
    {
      date: '2024-02-10',
      textColor: '#ffcb69',
      backgroundColor: '#2a2511',
    },
    {
      date: '2024-02-20',
      textColor: '#ffcb69',
      backgroundColor: '#2a2511',
    },
    {
      date: '2024-02-23',
      textColor: '#ffcb69',
      backgroundColor: '#2a2511',
    },
  ];

  constructor(
    private database: DatabaseService,
    private dates: DatesService
  ) {}

  ngOnInit() {
    if (!this.database.developMode) {
      this.developMode = false;
      this.getDatesWithTasks();
      this.getTodayTask();
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
    }
  }

  private async getDatesWithTasks() {
    this.highlightedDates = [];
    await this.database.loadOnlyDates();
    this.resDate = this.database.getDates();

    for (let dates of this.resDate()) {
      let date = this.dates.getOnlyDate(dates.datetime);
      this.highlightedDates.push({date: date, textColor: '#ffcb69', backgroundColor: '#2a2511'});
    }
  }

  private async getTodayTask() {
    let today = this.dates.getTodayDate();

    if (!this.developMode) {
      this.loadPage = true;
      await this.database.loadTaskDate(today).then(() => {
        this.tasks = this.database.getSelectedTask();
        if (this.tasks()[0] == undefined) {
          this.isNone = true;
        } else {
          this.isNone = false;
        }
        this.loadPage = false;
      });
    }
  }

  async getDate(date: any) {
    let fechaSeleccionada = date.detail.value;
    let fechaSeparada = fechaSeleccionada.split('T');

    fechaSeleccionada = fechaSeparada[0];

    console.log('Fecha seleccionada: ', fechaSeleccionada);

    if (!this.developMode) {
      this.loadPage = true;
      await this.database.loadTaskDate(fechaSeleccionada).then(() => {
        this.tasks = this.database.getSelectedTask();
        if (this.tasks()[0] == undefined) {
          this.isNone = true;
        } else {
          this.isNone = false;
        }
        this.loadPage = false;
      });
    }
  }
}

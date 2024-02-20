import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { SelectedTaskService } from '../services/selected-task.service';
import { NavController } from '@ionic/angular';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public datetime: any;
  tasks: any;
  loadpage: boolean = true;
  isNone: boolean = false;
  developMode = false;
  opciones: any;
  resDate: any;

  descriptionTest: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta.";

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
    private selectedTask: SelectedTaskService,
    private database: DatabaseService,
    private navCtrl: NavController,
    private dates: DatesService
  ) { }

  ngOnInit() {
    if (this.database.developMode == false) {
      this.developMode = false;
      this.getDatesWithTasks();
      this.getTodayTask();
    } else {
      this.developMode = true;
    }
  }

  private async getDatesWithTasks() {
    this.highlightedDates = [];
    await this.database.loadOnlyDates();
    this.resDate = this.database.getDates();

    for (let dates of this.resDate()) {
      this.highlightedDates.push({date: dates.date, textColor: '#ffcb69', backgroundColor: '#2a2511'});
    }
  }

  private async getTodayTask() {
    let today = this.dates.getTodayDate();

    if (this.developMode == false) {
      this.loadpage = true;
      await this.database.loadTaskDate(today).then(() => {
        this.tasks = this.database.getSelectedTask();
        if (this.tasks()[0] == undefined) {
          this.isNone = true;
        } else {
          this.isNone = false;
        }
        this.loadpage = false;
      });
    }
  }

  async getDate(date: any) {
    let fechaSeleccionada = date.detail.value;
    let fechaSeparada = fechaSeleccionada.split('T');

    fechaSeleccionada = fechaSeparada[0];

    console.log('Fecha seleccionada: ', fechaSeleccionada);

    if (this.developMode == false) {
      this.loadpage = true;
      await this.database.loadTaskDate(fechaSeleccionada).then(() => {
        this.tasks = this.database.getSelectedTask();
        if (this.tasks()[0] == undefined) {
          this.isNone = true;
        } else {
          this.isNone = false;
        }
        this.loadpage = false;
      });
    }
  }

  details(id: number) {
    this.selectedTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/details-task');
  }
}

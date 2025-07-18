import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SelectedTaskService } from '../../services/selected-task.service';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss'],
})
export class ScheduleCardComponent implements OnInit {
  @Input() task: any

  constructor(
    private selectedTask: SelectedTaskService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() { }

  details(id: number) {
    this.selectedTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/details-task');
  }
}

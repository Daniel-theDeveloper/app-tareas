import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SelectedTaskService } from '../../services/selected-task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: any;

  constructor(
    private selectedTask: SelectedTaskService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() { }

  actionEvent(id: any) {
    this.selectedTask.setSelectedTask(id);
    this.navCtrl.navigateForward('/details-task');
  }

}

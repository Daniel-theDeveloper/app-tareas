import { Component } from '@angular/core';
import { Todo } from '../todo';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tasks = this.database.getTasks();
  newTask = '';

  constructor(
    private database: DatabaseService
  ) { }
}

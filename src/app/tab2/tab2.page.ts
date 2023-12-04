import { Component } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public todos: Array<Todo> = [];

  constructor(
    // public todoService: TodoService
  ) { }

  async ngOnInit() {
    // this.todos = await this.todoService.read();
  }
}

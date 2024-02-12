import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedTaskService {
  private selectedTaskId: number = 0;

  constructor() { }

  setSelectedTask(id: number) {
    this.selectedTaskId = id;
  }

  getSelectedTask() {
    return this.selectedTaskId;
  }
}

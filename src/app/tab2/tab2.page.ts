import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public datetime: any;

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    const date = new Date();

    // Set the value of the datetime to 2 days
    // before the current day
    let dayChange = -2;

    // If the day we are going to set the value to
    // is in the previous month then set the day 2 days
    // later instead so it remains in the same month
    if (date.getDate() + dayChange <= 0) {
      dayChange = -dayChange;
    }

    // Set the value of the datetime to the day
    // calculated above
    date.setDate(date.getDate() + dayChange);
    this.datetime = date.toISOString();
  }
}

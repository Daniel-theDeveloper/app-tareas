import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  getTodayDate() {
    let fullDate: any = new Date().toISOString();
    fullDate = fullDate.split('T');

    return fullDate[0];
  }
}

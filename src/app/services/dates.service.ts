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

  getOnlyDate(datetime: string) {
    console.log("Fecha recibida: "+datetime) //borrar esto
    const date = datetime.split('T');
    return date[0];
  }
}

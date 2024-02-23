import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  selectedLanguaje: string = "Español"
  isAlertOpen: boolean = false;
  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Mejor no');
      },
    },
    {
      text: '¡Si!',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  constructor() {}

  clickMe(option: number) {
    console.log("Test");
    if (option === 3) {
      this.isAlertOpen = true;
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}

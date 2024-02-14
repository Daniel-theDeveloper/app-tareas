import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.page.html',
  styleUrls: ['./tap4.page.scss'],
})
export class Tap4Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  details(id: number) {
    console.log("Detalles de la tarea con ID: "+id);
  }

}

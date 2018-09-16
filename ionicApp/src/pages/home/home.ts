import { Component } from '@angular/core';
import { NavController, ModalController  } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  patients: any;
  constructor(public nav: NavController, public modalCtrl: ModalController) {
  }

}

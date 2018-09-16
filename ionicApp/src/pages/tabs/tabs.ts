import { SendSmsPage } from './../send-sms/send-sms';
import { AllpatientsPage } from './../allpatients/allpatients';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { PatientPage } from '../patient/patient';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PatientPage;
  tab3Root = AllpatientsPage;
  tab4Root = SendSmsPage;

  constructor() {

  }
}

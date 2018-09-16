import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllpatientsPage } from './allpatients';

@NgModule({
  declarations: [
    AllpatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllpatientsPage),
  ],
})
export class AllpatientsPageModule {}

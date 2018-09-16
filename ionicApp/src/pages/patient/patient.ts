import { Component } from '@angular/core';
import { IonicPage,
  NavController,
  LoadingController,
  NavParams,
  ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html',
})
export class PatientPage {
  public patientName: String;
  public areacode: Number
  public telnumber: String;

  public items: Array<any>;
  public netavailable: string;
  private _HOST: string = "http://localhost:8080/";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _TOAST: ToastController,
    private _HTTP: HttpClient,
    public loading: LoadingController
  ) {}
  addPatient(patientName: any,areacode: any,telnumber: any): void {
    var data = {
      "patientName": patientName,
      "areacode": areacode,
      "telnumber": telnumber,
    };
    var header = { "headers": {"Content-Type": "application/json"} };
    this._HTTP.post(this._HOST+"api/patients", data, header).subscribe(data => {
      console.log(data);
    });
    this.displayNotification("Patient successfully added");
  }

  displayNotification(message: string): void {
    let toast = this._TOAST.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PatientsPage");
  }

}

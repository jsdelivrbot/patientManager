import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the AllpatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allpatients',
  templateUrl: 'allpatients.html',
})
export class AllpatientsPage {
  public items: Array<any>;
  public netavailable: string;
  private _HOST: string = "http://localhost:8080/";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _TOAST: ToastController,
    private _HTTP: HttpClient,
    public loading: LoadingController) {
  }

  ionViewDidEnter(): void {
    this.retrieve();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllpatientsPage');
  }

  deletePatient(item: any): void {
    let recordID: string = item._id,
      url: any = this._HOST + "api/patients/" + recordID;
    this._HTTP.delete(url).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.dir(error);
      }
    );
    this.displayNotification("Patient successfully deleted");
    this.retrieve();
  }

  displayNotification(message: string): void {
    let toast = this._TOAST.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  retrieve(): void {
    let loader = this.loading.create({
      content: "Fetching data from server..."
    });
    this._HTTP.get(this._HOST + "api/patients").subscribe(
      (data: any) => {
        loader.dismiss();
        this.items = data;
        console.log(this.items);
      },
      (error: any) => {
        loader.dismiss();
        console.dir(error);
      }
    );
  }

}

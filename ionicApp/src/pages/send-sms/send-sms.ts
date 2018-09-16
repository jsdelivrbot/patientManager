import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the SendSmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-sms',
  templateUrl: 'send-sms.html',
})
export class SendSmsPage {
  public areacode: Number
  public msg: String = "You Midwife: Reminder - Tommorow.";

  public items: Array<any>;
  public netavailable: string;
  private _HOST: string = "http://localhost:8080/";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _TOAST: ToastController,
    private _HTTP: HttpClient,
    public loading: LoadingController) {
  }

  ionViewDidEnter(): void {
    this.retrieve();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SendSmsPage');
  }
  sendSMS(areacode: any, msg: any): void {
    var data = {
      "areacode": areacode,
      "msg": msg
    };
    console.log(data);
    var header = { "headers": {"Content-Type": "application/json"} };
    this._HTTP.post(this._HOST+"api/smspatients", data, header).subscribe(data => {
      console.log(data);
    });
    this.displayNotification("Sending reminders.");
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
    this._HTTP.get(this._HOST + "api/areacodes").subscribe(
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

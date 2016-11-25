import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import Time = google.maps.Time;
import { OrganeedService } from '../../providers/organeed';
// import { Toast } from 'ionic-native';
import { SchedulePage } from '../schedule/schedule';
import { LoadingController } from 'ionic-angular';
import { AddressPicker } from '../addressPicker/addressPicker';

@Component({
    templateUrl: 'createevent.html',
})
export class CreateEventPage {
    addevent: {title?: string, desc?: string, startDate?: Date, endDate?: Date, startTime?: Time, endTime?: Time, localisation?: string} = {};
    submitted = false;
    placeId: any;
    lat: any;
    lng: any;

    constructor(public navCtrl: NavController, private organeed: OrganeedService, public loadingController: LoadingController,
                public alertCtrl: AlertController, public modalCtrl: ModalController) {
    }
    onCreate(form) {
        this.submitted = true;
        console.log(this.addevent.startDate);
        if (form.valid) {
            let loader = this.loadingController.create({
                content: ''
            });
            loader.present();
            // create event
            this.organeed.addevent(this.addevent.title, this.addevent.startDate, this.addevent.startTime,
                this.addevent.endDate, this.addevent.endTime, this.addevent.desc, this.addevent.localisation, this.lat, this.lng).subscribe(
                data => {
                    loader.dismiss();
                    this.navCtrl.setRoot(SchedulePage).then(() => {
                        const index = this.navCtrl.getActive().index;
                        this.navCtrl.remove(0, index);
                    });
                },
                err => {
                    let alert = this.alertCtrl.create({
                        title: 'Oupss !',
                        subTitle: 'Une erreur est survenue lors de l\'enregistrement de l\'évènement. Veuillez réessayer ultérieusement.',
                        buttons: ['OK']
                    });
                    alert.present();
                },
                () => console.log('Event is ')
            );
        }
    }
    // show adress picker modal to choose adress
    showAddressModal () {
        let modal = this.modalCtrl.create(AddressPicker);
        modal.onDidDismiss(data => {
            this.addevent.localisation = data.description;
            this.placeId = data.place_id;
            this.organeed.geocodeFromPlaceId(this.placeId).subscribe(data => {
                this.lat = data.json().results[0].geometry.location.lat;
                this.lng = data.json().results[0].geometry.location.lng;
            });
            // https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJd8BlQ2BZwokRAFUEcm_qrcA&key=AIzaSyAnd0nfrbREPF8_x0P7KfJ8nOMBGEoi-TU
        });
        modal.present();
    }
}

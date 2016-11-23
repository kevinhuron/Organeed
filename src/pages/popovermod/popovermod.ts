import { Component } from '@angular/core';
import {  ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { FilterCom } from '../filterCom/filterCom';

@Component({
    templateUrl: 'popovermod.html',
})

export class PopoverMod {

    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController) {
    }

    showFilterComModal () {
        let modal = this.modalCtrl.create(FilterCom);
        modal.onDidDismiss(data => {

        });
        modal.present();
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { EventDetailPage } from '../event-detail/event-detail';


@Component({
  templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.navCtrl.push(EventDetailPage, session);
  }
}

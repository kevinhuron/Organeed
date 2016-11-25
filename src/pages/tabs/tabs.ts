import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { CalendarEvent } from '../calendarevent/calendarevent';
import { CreateEventPage } from '../createevent/createevent';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // set the root pages for each tab
    tab1Root: any = SchedulePage;
    tab2Root: any = CalendarEvent;
    tab3Root: any = CreateEventPage;
    tab4Root: any = MapPage;
    tab5Root: any = AboutPage;
    // tab5Root: any = CreateEventPage;
    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
}

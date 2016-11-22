import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {CreateEventPage} from "../pages/createevent/createevent";
import {AccountPage} from "../pages/account/account";
import {EventDetailPage} from "../pages/event-detail/event-detail";
import {LoginPage} from "../pages/login/login";
import {MapPage} from "../pages/map/map";
import {SchedulePage} from "../pages/schedule/schedule";
import {SignupPage} from "../pages/signup/signup";
import {SpeakerDetailPage} from "../pages/speaker-detail/speaker-detail";
import {CalendarEvent} from "../pages/calendarevent/calendarevent";
import {TabsPage} from "../pages/tabs/tabs";
import {TagsList} from "../pages/tags-list/tags-list";
import {AddressPicker} from "../pages/addressPicker/addressPicker";
import {FilterCom} from "../pages/filterCom/filterCom";

import {OrganeedService} from "../providers/organeed";
import {ConferenceData} from "../providers/conference-data";
import {UserData} from "../providers/user-data";
import {TruncatePipe} from "../pipes/truncate";
import 'intl';
import 'intl/locale-data/jsonp/en';



//import {Component} from "ionic-angular";
import {MomentModule} from 'angular2-moment';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateEventPage,
    AccountPage,
    EventDetailPage,
    LoginPage,
    MapPage,
    SchedulePage,
    SignupPage,
    SpeakerDetailPage,
    CalendarEvent,
    TruncatePipe,
    TagsList,
    AddressPicker,
    FilterCom

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateEventPage,
    AccountPage,
    EventDetailPage,
    LoginPage,
    MapPage,
    SchedulePage,
    SignupPage,
    SpeakerDetailPage,
    CalendarEvent,
    TagsList,
    AddressPicker,
    FilterCom
  ],
  providers: [
    OrganeedService,
    UserData,
    ConferenceData,

  ]
})

export class AppModule {}


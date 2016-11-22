import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { OrganeedService } from '../../providers/organeed';
import { ConferenceData } from '../../providers/conference-data';


@Component({
    templateUrl: 'tags-list.html'
})
export class TagsList {
    // tracks: Array<{name: string, isChecked: boolean}> = [];
    tagsChoosen: Array<{id: number, name: string, color: string, isChecked: boolean}> = [];
    tags = [];

    constructor(public confData: ConferenceData,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                private organeed: OrganeedService) {

        // passed in array of track names that should be excluded (unchecked)
        let excludedTags = this.navParams.data;
        this.viewCtrl =  viewCtrl;
        this.organeed.getTags().subscribe(res => {
            console.log('organeed get tags passed');
            let tags = res.json().tags;
            for (let tag of tags) {
                console.log(excludedTags.indexOf(tag.id_tags));
                this.tagsChoosen.push({
                    id: tag.id_tags,
                    name: tag.name,
                    color: tag.color,
                    isChecked: (excludedTags.indexOf(tag.id_tags) >= 0)
                });
            }
        });
        /*this.confData.getTracks().then((trackNames: string[]) => {

         trackNames.forEach(trackName => {
         this.tracks.push({
         name: trackName,
         isChecked: (excludedTrackNames.indexOf(trackName) === -1)
         });
         });
         });*/
    }

    /*ngAfterViewInit() {
     this.getTag();
     }*/

    /*getTag() {
        this.organeed.getTags().subscribe(res => {
            console.log('organeed get tags passed');
            this.tags = res.json().tags;
            console.log(res.json().tags);
        });
    }*/

    resetFilters() {
        // reset all of the toggles to be unchecked
        this.tagsChoosen.forEach(tag => {
            tag.isChecked = false;
        });
    }

    applyFilters() {
        // Pass back a new array of track names to exclude
        // let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
        // this.dismiss(excludedTrackNames);
        // let tagsChoosenNameColor;
        let tagChoosenId = this.tagsChoosen.filter(c => c.isChecked).map(c => c.id);
        // let tagChoosenName = this.tagsChoosen.filter(c => !c.isChecked).map(c => c.name);
        // let tagChoosenColor = this.tagsChoosen.filter(c => !c.isChecked).map(c => c.color);
        // console.log(this.tags);
        // tagsChoosenNameColor = Array(tagChoosenName, tagChoosenColor, tagChoosenId);
        // console.log(tagsChoosenNameColor);
        this.dismiss(tagChoosenId);
    }

    dismiss(data) {
        // using the injected ViewController this page
        // can "dismiss" itself and pass back data
        if (data == null)
            this.viewCtrl.dismiss();
        else
            this.viewCtrl.dismiss(data);
    }
}

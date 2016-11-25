import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';
import { OrganeedService } from '../../providers/organeed';

@Component({
    templateUrl: 'filterCom.html'
})
export class FilterCom {
    tagsChoosen: Array<{id: number, name: string, color: string, isChecked: boolean}> = [];
    tags = [];

    constructor (public viewCtrl: ViewController, private organeed: OrganeedService, public navParams: NavParams) {

        let excludedTags = this.navParams.data;
        this.organeed.getTags().subscribe(res => {
            console.log('organeed get tags passed');
            let tags = res.json().tags;
            for (let tag of tags) {
                this.tagsChoosen.push({
                    id: tag.id_tags,
                    name: tag.name,
                    color: tag.color,
                    isChecked: (excludedTags.indexOf(tag.id_tags) >= 0)
                });
            }
        });
    }

    applyFilters() {
        let tagChoosenId = this.tagsChoosen.filter(c => c.isChecked).map(c => c.id);
        this.dismiss(tagChoosenId);
    }

    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }

    resetFilters() {
        // reset all of the toggles to be unchecked
        this.tagsChoosen.forEach(tag => {
            tag.isChecked = false;
        });
    }

}

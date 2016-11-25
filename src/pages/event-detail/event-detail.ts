import { Component } from '@angular/core';
import { OrganeedService } from '../../providers/organeed';
import { TagsList } from '../tags-list/tags-list';
import { NavParams, AlertController, /*ViewController,*/ PopoverController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ModalController, LoadingController } from 'ionic-angular';
import { PopoverMod } from '../popovermod/popovermod';

/** END POPOVER **/

@Component({
    templateUrl: 'event-detail.html',
})
export class EventDetailPage {
    event: any;
    comment: {message?: string} = {};
    submitted = false;
    lastIdCom = 0;
    nbComments = 0;
    comments = [];
    userid: any;
    filterTagsAdded = [];
    tagdetail = [];
    colors = [];

    constructor(public navParams: NavParams, public alertCtrl: AlertController, public loadingController: LoadingController,
                private organeed: OrganeedService, public popoverCtrl: PopoverController, public userData: UserData,
                public modalCtrl: ModalController) {
        this.event = navParams.data;
    }

    ngAfterViewInit() {
        this.userid = this.getUserId();
        this.updateComment(this.event.id_event);
    }

    onComment(form) {
        let alertMessage = this.alertCtrl.create({
            title: 'Erreur !',
            subTitle: 'Veuillez saisir un message !',
            buttons: ['OK']
        });
        let alert = this.alertCtrl.create({
            title: 'Oupss !',
            subTitle: 'Une erreur est survenue ! Veuillez réessayer ultérieurement.',
            buttons: ['OK']
        });
        let loader = this.loadingController.create({
            content: ''
        });
        console.log(this.comment.message);
        // check if user write real word
        if (this.comment.message.trim().length === 0) {
            console.log('no message');
            alertMessage.present();
        } else {
            console.log('message OK');
            loader.present();
            // insert comment to this event
            this.organeed.addCommentToEvent(this.event.id_event, this.comment.message).subscribe(
                data => {
                    this.lastIdCom = data.json().last_id;
                    if (this.filterTagsAdded) {
                        for (let idtag of this.filterTagsAdded) {
                            console.log(idtag);
                            console.log(this.lastIdCom);
                            this.linkTagToComment(idtag, this.lastIdCom);
                        }
                    }
                    this.updateComment(this.event.id_event);
                    loader.dismiss();

                    this.comment.message = null;
                    console.log('comment inserted');
                },
                err => {
                    alert.present();
                    loader.dismiss();
                    console.log(err.json().message);
                },
                () => console.log('Comment insert is succesful')
            );
        }
    }

    linkTagToComment(idTag, idComment) {
        this.organeed.linkTagToComment(idTag, idComment).subscribe(data => {
                this.updateComment(this.event.id_event);
            },
            err => {
                console.log('Error link tag comment');
            },
            () => console.log('link tag comment succesfull')
        );
    }

    updateComment(idevent) {
        // get list of comment by event
        this.organeed.getComments(idevent).subscribe(res => {
            console.log('organeed get comments passed');
            this.nbComments = res.json().comments.length;
            this.comments = res.json().comments;
            // console.log(this.comments);
            for (let comment of this.comments) {
                this.organeed.getTagColorByIdCom(comment.id_comment).subscribe(res => {
                    // this.comments.push(comment, res.json().result);
                    this.colors = res.json().result;
                });
            }
        });
    }

    presentPopover(event) {
        let popover = this.popoverCtrl.create(PopoverMod);
        popover.present({ev: event});
    }


    getUserId() {
        this.userData.getUserId().then((userid) => {
            this.userid = userid;
        });
    }

    addTagsFilter() {
        let modal = this.modalCtrl.create(TagsList, this.filterTagsAdded);
        modal.present();

        modal.onDidDismiss((data: any[]) => {
            if (data) {
                this.filterTagsAdded = data;
                this.getTagDetailById();
            }
        });
    }

    getTagDetailById() {
        this.organeed.getTagsById(this.filterTagsAdded).subscribe(res => {
            console.log('organeed get tag by id passed');
            this.tagdetail = res.json().tags;
            console.log(this.tagdetail);
        });
    }
}

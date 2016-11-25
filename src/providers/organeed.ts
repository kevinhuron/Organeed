import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class OrganeedService {
    constructor(private http: Http) {
    }

    private headers() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
        headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        return headers;
    }
    geocodeFromPlaceId(placeId) {
        let repos = this.http.get('https://maps.googleapis.com/maps/api/geocode/json?place_id=' + placeId + '&key=AIzaSyAnd0nfrbREPF8_x0P7KfJ8nOMBGEoi-TU');
        return repos;
    }
    logout() {
        var header = this.headers();
        let repos = this.http.get('http://92.222.94.185/api/logout', {headers : header});
        return repos;
    }
    connection(email, password) {
        var header = this.headers();
        var creds = {email: email, password: password} ;
        let repos = this.http.post('http://92.222.94.185/api/login', JSON.stringify(creds), {headers : header});
        return repos;
    }
    register(firtname, lastname, age, tel, email, password) {
        var header = this.headers();
        var creds = {firt_name: firtname, last_name: lastname, age: age, phone_number: tel, email: email, password: password};
        let repos = this.http.post('http://92.222.94.185/api/register', JSON.stringify(creds), {headers : header});
        return repos;
    }
    eventlist() {
        let repos = this.http.get('http://92.222.94.185/api/get/eventsByManager', null);
        return repos;
    }
    addevent(title, datestart, timestart, dateend, timeend, desc, local, lat, lng) {
        var header = this.headers();
        var creds = {title: title, date_start: datestart, date_end: dateend, hour_start: timestart,
            hour_end: timeend, description: desc, place: local, lat: lat, lng: lng};
        console.log(creds);
        let repos = this.http.post('http://92.222.94.185/api/new/event', JSON.stringify(creds),  {headers : header});
        return repos;
    }
    getEventByManager(querysearch) {
        var header = this.headers();
        let repos;
        if (querysearch) {
            repos = this.http.get('http://92.222.94.185/api/get/eventsByManager?querySearch=' + querysearch, {headers : header});
        } else {
            repos = this.http.get('http://92.222.94.185/api/get/eventsByManager', {headers : header});
        }
        return repos;
    }
    getComments(idevent) {
        let repos = this.http.get('http://92.222.94.185/api/get/comments?id_event=' + idevent);
        return repos;
    }
    addCommentToEvent(idevent, message/*, idcommentresponse = null, img = null*/) {
        var header = this.headers();
        var creds = {id_event: idevent, content: message};
        let repos = this.http.post('http://92.222.94.185/api/new/comment', JSON.stringify(creds), {headers : header});
        return repos;
    }
    getTags() {
        var header = this.headers();
        let repos = this.http.get('http://92.222.94.185/api/get/tags', {headers : header});
        return repos;
    }
    getTagsById(idtag) {
        var header = this.headers();
        let repos = this.http.get('http://92.222.94.185/api/get/tagsById?id_tag=' + idtag, {headers : header});
        return repos;
    }
    getTagColorByIdCom(idCom) {
        var header = this.headers();
        let repos = this.http.get('http://92.222.94.185/api/get/tagColorByIdCom?id_comment=' + idCom, {headers : header});
        return repos;
    }
    linkTagToComment(idTag, idcomment) {
        var header = this.headers();
        var creds = {id_tags: idTag, id_comment: idcomment};
        let repos = this.http.post('http://92.222.94.185/api/add/tagToComment', JSON.stringify(creds), {headers : header});
        return repos;
    }
    getLatLngEvent() {
        var header = this.headers();
        let repos = this.http.get('http://92.222.94.185/api/get/latLngEvents', {headers : header});
        return repos;
    }
    getUserById() {
        var header = this.headers();
        let repos = this.http.get('http://92.222.94.185/api/get/userById', {headers : header});
        return repos;
    }
    updateUserById(firstname, lastname, password, email, img) {
        var header = this.headers();
        let creds;
        if (firstname !== null) {
            creds = {first_name: firstname};
        } else if (lastname !== null) {
            creds = {last_name: lastname};
        } else if (password !== null) {
            creds = {password: password};
        } else if (email !== null) {
            creds = {email: email};
        } else if (img !== null) {
            creds = {img: img};
        }
        let repos = this.http.post('http://92.222.94.185/api/update/userById', JSON.stringify(creds), {headers : header});
        return repos;
    }
}

import { Component } from '@angular/core';
import { OrganeedService } from '../../providers/organeed';


@Component({
    templateUrl: 'map.html'
})
export class MapPage {

    constructor(private organeed: OrganeedService) {
        this.loadMap();
    }

    loadMap() {
        this.organeed.getLatLngEvent().subscribe(data => {
            let mapEle = document.getElementById('map');
            let mapData = data.json().latlng;
            let map =  new google.maps.Map(mapEle, {
                center: new google.maps.LatLng( 46.52863469527167, 2.43896484375 ),
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            });

            mapData.forEach(markerData => {
                if (markerData.lat !== null && markerData.lng !== null) {
                    let infoWindow = new google.maps.InfoWindow({
                        content: `<h3>${markerData.title}</h3>
                        <h4>${markerData.date_start} - ${markerData.date_end}</h4>
                        <p>Du ${markerData.date_start} à ${markerData.hour_start} Au ${markerData.date_end} à ${markerData.hour_end}</p>`
                    });

                    let marker =  new google.maps.Marker({
                        position:  new google.maps.LatLng( markerData.lat, markerData.lng ),
                        map: map,
                        title: 'Test'
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });
                }
            });
            google.maps.event.addListenerOnce(map, 'idle', () => {
                mapEle.classList.add('show-map');
            });
        }, (err) => {
            console.log(err);
        });
    }
}

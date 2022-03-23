import { Component, AfterViewInit, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ElementRef } from "@angular/core";
import { PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { TranslateService } from '@ngx-translate/core';
import { GoogleMap } from "@angular/google-maps";
import { AddonService } from "./addon.service";

@Component({
    selector: 'addon-module',
    templateUrl: './addon.component.html',
    styleUrls: ['./addon.component.scss']
})
export class AddonComponent implements OnInit {

    @ViewChild('mapRef', {static: true }) mapElement: ElementRef;
    
    map = null;
    officeIcon = null;

    constructor(
        private renderer: Renderer2,
        public addonService: AddonService,
        public layoutService: PepLayoutService,
        public translate: TranslateService
    ) {
        this.layoutService.onResize$.subscribe(size => {
            
        });
    }

    ngOnInit() {
        this.renderMap();

        let params = {
            email:   'nitsan.p@pepperi.com',
            Value : {Name:"Nitsan Prat", 
                    Address: "Bental 9 Kfar Yona Israel", 
                    StartedDateTime: "10/03/2010", 
                    Title: "Project Manager", 
                    Department: "Post Sales",
                    FunFact: "I have 15 cats!"}
        }

        this.addonService.setEmployeeDetails(params);
        
    }

    loadMap = () => {
        this.map = new window['google'].maps.Map(this.mapElement.nativeElement, {
          center: {lat: 32.184448, lng: 34.870766},
          zoom: 2
        });
        
        this.officeIcon = {
            url: "https://www.pepperi.com/wp-content/uploads/2015/06/pepperi-favicon.png", // url
            scaledSize: new google.maps.Size(30, 30), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        const image = "https://yonatankof.com/misc/pepp/Pepperi%20-%20Icon%20-%20Green%20on%20White%20Square.png";
        
        let markers = this.getOfficeMarkers();

        var contentString = '<div id="content">'+
        '<h3 class="thirdHeading">Pepperi - Israel</h3>'+
        '<div id="bodyContent">'+
        '<p>14 Hacharoshet, RAANANA 4365707</p>'+
        '</div>'+
        '</div>';
     
        var infowindow = new window['google'].maps.InfoWindow({
          content: contentString
        });
     

    markers.forEach(markerInfo => {
            const marker = new google.maps.Marker({
                ...markerInfo
              });

              const infoWindow = new google.maps.InfoWindow({
                content: marker.getTitle()
              });

             
    marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });
    })
     
    }

    renderMap() {
     
        window['initMap'] = () => {
          this.loadMap();      
        }
        if(!window.document.getElementById('google-map-script')) {
          var s = window.document.createElement("script");
          s.id = "google-map-script";
          s.type = "text/javascript";
          s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCfG-8KGkjaSMWDAugbAjgChKPw2Tg6I1c&callback=initMap";
           
          window.document.body.appendChild(s);
        } else {
          this.loadMap();
        }
    }

    getOfficeMarkers(){
        return [
            {
              position: new google.maps.LatLng(32.184448, 34.870766),
              map: this.map,
              animation: window['google'].maps.Animation.DROP,
              title: "Raanana Israel",
              icon: this.officeIcon
            },
            {
              position: new google.maps.LatLng(50.450001, 30.523333),
              map: this.map,
              animation: window['google'].maps.Animation.DROP,
              title: "Kiev Ukraine",
              icon: this.officeIcon
            },
            {
                position: new google.maps.LatLng(40.730610, -73.935242),
                map: this.map,
                animation: window['google'].maps.Animation.DROP,
                title: "New York",
                icon: this.officeIcon
            },
            {
                position: new google.maps.LatLng(-33.865143, 151.209900),
                map: this.map,
                animation: window['google'].maps.Animation.DROP,
                title: "Australia",
                icon: this.officeIcon
            }
        ];
    }

    getEmployeeMarkers(){
        //let a = this.addonService.getEmployeeDetails();
    }

    openDialog() {
        
    }
}

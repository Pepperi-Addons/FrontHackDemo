import { Component, AfterViewInit, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ElementRef } from "@angular/core";
import { PepAddonService, PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { TranslateService } from '@ngx-translate/core';
import { GoogleMap } from "@angular/google-maps";
import { AddonService } from "./addon.service";
import { PepDialogService } from "@pepperi-addons/ngx-lib/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { EmployeeCardComponent } from '../components/employeeCard/employee-card.component';
import { NOT_BOOTSTRAPPED } from "single-spa";

@Component({
    selector: 'addon-module',
    templateUrl: './addon.component.html',
    styleUrls: ['./addon.component.scss'],
    providers: [EmployeeCardComponent]
})
export class AddonComponent implements OnInit {

    @ViewChild('mapRef', {static: true }) mapElement: ElementRef;
    
    imagesPath: string;
    map = null;
    officeIcon = null;
    lastInfoMarker = null;
    employeeMarkers = null;

    //play card
    interval = 5000;
    autoPlay = false;

    constructor(
        private renderer: Renderer2,
        private pepAddonService: PepAddonService,
        public addonService: AddonService,
        public layoutService: PepLayoutService,
        public translate: TranslateService,
        public dialogService: PepDialogService,
    ) {
        this.imagesPath = this.pepAddonService.getAddonStaticFolder() + 'assets/images/';

        this.layoutService.onResize$.subscribe(size => {
            
        });
    }

    ngOnInit() {

        /*
        let params =  {
            email: 'lior.g@pepperi.com',
            Value: {Name:"Lior Goell", 
                    Address: "105-05 69th Ave, Forest Hills, NY, 11375", 
                    latlong:{lat:"40.724320", long:"-73.848450"}, 
                    StartedDateTime: "03/08/2015", 
                    Title: "VP US Operations", 
                    Department: "Not sure",
                    FunFact: "Recovered diamonds with the estimated value of $20 M"}
        }

          let res =  this.addonService.setEmployeeDetails(params)

       
        
          params = {
            email: 'mor.k@pepperi.com',
            Value: {Name:"Mor Konshtok", 
                    Address: "333 River street, Hoboken, NJ, 07030", 
                    latlong:{lat:"40.739910", long:"-74.027610"}, 
                    StartedDateTime: "08/16/2021", 
                    Title: "Office Manager & Customer services", 
                    Department: "Not sure",
                    FunFact: "Never smoked a cigarette or drank coffee"}
        }
        
        res =  this.addonService.setEmployeeDetails(params)
        */

        this.renderMap(); 
    }

    ngAfterViewInit(){
        var data = {
            'imagePath': this.imagesPath,
            'employeeMarkers': this.employeeMarkers
        }
        this.openDialog(EmployeeCardComponent, (res) => {debugger}, data);
    }

    loadMap = async () => {

// Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.
  const styledMapType = new google.maps.StyledMapType(
    [
      { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#c9b2a6" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{ color: "#dcd2be" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ae9e90" }],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#a5b076" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f5f1e6" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#fdfcf8" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#f8c967" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#e9bc62" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#e98d58" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#db8555" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#b9d3c2" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#92998d" }],
      },
    ],
    { name: "Styled Map" }
  );

        this.map = new window['google'].maps.Map(this.mapElement.nativeElement, {
          center: {lat: 32.184448, lng: 34.870766},
          fullscreenControl: true,
          zoom: 12,
          mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
          },
        });

         //Associate the styled map with the MapTypeId and set it to display.
         this.map.mapTypes.set("styled_map", styledMapType);
         this.map.setMapTypeId("styled_map");
        
        this.officeIcon = {
            url: this.imagesPath + '/icons/Pin-0-Pepperi.png', // url
            scaledSize: new google.maps.Size(30, 40), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        const image = "https://yonatankof.com/misc/pepp/Pepperi%20-%20Icon%20-%20Green%20on%20White%20Square.png";
        
        //let markers = this.getOfficeMarkers();
        this.employeeMarkers = await this.getEmployeeMarkers();

        this.employeeMarkers.forEach(markerInfo => {
            const marker = new google.maps.Marker({
                ...markerInfo
            });

            const infoWindow = this.getInfoWindow(JSON.parse(markerInfo.title));

            marker.addListener("click", () => {
                if(this.lastInfoMarker){
                    this.lastInfoMarker.close();
                }
            
             infoWindow.open(marker.getMap(), marker);
                this.lastInfoMarker = infoWindow;
            });
        });

        if(this.autoPlay){
            var self = this;
            self.openInfoWindow(0);
            let index = 1;
            setInterval(function() {
                self.openInfoWindow(index);
                index = index < self.employeeMarkers.length -1  ? index+1 : 0;
            }, this.interval);
    }

    }
    openInfoWindow(index){
        if(this.lastInfoMarker){
            this.lastInfoMarker.close();
        }
        let marker = new google.maps.Marker({
            ...this.employeeMarkers[index]
        });
        let infoWindow = this.getInfoWindow(JSON.parse(this.employeeMarkers[index].title));
        infoWindow.open(this.map,marker);
        this.lastInfoMarker = infoWindow;
    }

    getInfoWindow(markerInfo){

        const imageSRC = this.imagesPath + '/employees/' + markerInfo.email.split('@')[0] + '.jpg';

        return new google.maps.InfoWindow({
                content:   `<div class="cardMarker">
                            <div class="markerContainer">
                                <div class="cardContent">
                                    <h3 class="title-xl">`+markerInfo.Name+`</h3>
                                    <p class="body-lg">`+markerInfo.Title+`</p>
                                    <p class="body-lg">`+markerInfo.Department+`</p>
                                    <p class="body-lg">`+markerInfo.FunFact+`</p>
                                    <p class="body-lg"> Since: ${markerInfo.StartedDateTime}</p>
                                    <p class="body-lg">`+markerInfo.Address+`</p>
                                </div>
                                <div class="cardImage">
                                    <img src="`+imageSRC+`" style="width:150px;">
                                </div>
                                </div>
                            </div>`
              });
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

    async getEmployeeMarkers(){
        let empArr = [];
        let params = {
            addonUUID: '7a3305ff-f41d-43be-8703-d6efb4250d48'
        }
        let employee = await this.addonService.getEmployeeDetails(params);
       
        employee.empDetails?.forEach(emp => {
           const email = emp.Key;
           emp = JSON.parse(emp.Value);
           emp.email = email;
           if(emp.FunFact != "I have 15 cats!"){
            empArr.push({
                position: new google.maps.LatLng(emp.latlong.lat , emp.latlong.long),
                    //position: new google.maps.LatLng(32.159570 , 34.944170),
                    map: this.map,
                    animation: window['google'].maps.Animation.DROP,
                    title: JSON.stringify(emp),
                    icon: this.getEmployeeMarker(emp.StartedDateTime)
            });
           }
       });

       return empArr;
    }

    getEmployeeMarker(date){

        var workingYears: number = new Date().getFullYear() - new Date(date).getFullYear() || 1;
        const img = workingYears < 2 ? 'Pin-2-Sophomore-Chicken.png' : workingYears < 5 ? 'Pin-1-Freshman-Chick.png' : 'Pin-3-Senior-Chicken.png';
        let empIcon = {
            url: this.imagesPath + '/icons/' + img,
            scaledSize: new google.maps.Size(30, 40), // scaled size
            //origin: new google.maps.Point(0,0), // origin
            //anchor: new google.maps.Point(0, 0) // anchor
        };

        return empIcon;
    }

    openDialog(comp: any, callBack, data = {}){
    
        let config = this.dialogService.getDialogConfig({}, 'inline');
            config.disableClose = true;
            config.minWidth = '29rem'; // THE EDIT MODAL WIDTH

            
        let dialogRef: MatDialogRef<any> = this.dialogService.openDialog(comp, data, config);

        dialogRef.afterClosed().subscribe((value) => {
            if (value !== undefined && value !== null) {
                callBack(value);
            }
        });
    }
}

import { Component, AfterViewInit, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ElementRef } from "@angular/core";
import { PepAddonService, PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { TranslateService } from '@ngx-translate/core';
import { GoogleMap } from "@angular/google-maps";
import { AddonService } from "./addon.service";
import { PepDialogService } from "@pepperi-addons/ngx-lib/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { EmployeeCardComponent } from '../components/employeeCard/employee-card.component';

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
        this.renderMap();
        //this.openDialog(EmployeeCardComponent,null,null);
        // let params = {
        //     email:   'nitsan.p@pepperi.com',
        //     Value : {Name:"Nitsan Prat", 
        //             Address: "Bental 9 Kfar Yona Israel", 
        //             StartedDateTime: "10/03/2010", 
        //             Title: "Project Manager", 
        //             Department: "Post Sales",
        //             FunFact: "I have 15 cats!"}
        // }

        // this.addonService.setEmployeeDetails(params);
        
    }

    loadMap = async () => {
        this.map = new window['google'].maps.Map(this.mapElement.nativeElement, {
          center: {lat: 32.184448, lng: 34.870766},
          zoom: 2
        });
        
        this.officeIcon = {
            url: this.imagesPath + '/icons/Pin-0-Pepperi.png', // url
            scaledSize: new google.maps.Size(30, 40), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        const image = "https://yonatankof.com/misc/pepp/Pepperi%20-%20Icon%20-%20Green%20on%20White%20Square.png";
        
        let markers = this.getOfficeMarkers();
        let empMarkers = await this.getEmployeeMarkers();

        markers = markers.concat(empMarkers);
        // var contentString = '<div id="content">'+
        // '<h3 class="thirdHeading">Pepperi - Israel</h3>'+
        // '<div id="bodyContent">'+
        // '<p>14 Hacharoshet, RAANANA 4365707</p>'+
        // '</div>'+
        // '</div>';
     
        // var infowindow = new window['google'].maps.InfoWindow({
        //   content: contentString
        // });
     

    markers.forEach(markerInfo => {
            const marker = new google.maps.Marker({
                ...markerInfo
              });

              const infoWindow = new google.maps.InfoWindow({
                content: //marker.getTitle() var contentString = '<div id="content">'+
                '<h2 class="thirdHeading">'+marker.getTitle()+'</h2>'+
                '<div id="bodyContent">'+
                '<p></p>'+
                '</div>'+
                '</div>'
              });

             
    marker.addListener("click", () => {
        debugger;
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

    async getEmployeeMarkers(){
        let empArr = [];
        let params = {
            addonUUID: '7a3305ff-f41d-43be-8703-d6efb4250d48'
        }
        let employee = await this.addonService.getEmployeeDetails(params);
       
        employee.empDetails?.forEach(emp => {
           emp = JSON.parse(emp.Value)
           empArr.push({
                position: new google.maps.LatLng(32.159570 , 34.944170),
                map: this.map,
                animation: window['google'].maps.Animation.DROP,
                title: emp.Name,
                icon: this.getEmployeeMarker()
         });
       });

       return empArr;
    }

    getEmployeeMarker(){

        let empIcon = {
            url: this.imagesPath + '/icons/Pin-1-Freshman-Chick.png',
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

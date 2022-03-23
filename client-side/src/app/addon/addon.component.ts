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
    @Input() hostObject: any;
    
    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    
    @ViewChild('mapRef', {static: true }) mapElement: ElementRef;
    
    
 
    //options: google.maps.MapOptions;

    constructor(
        private renderer: Renderer2,
        public addonService: AddonService,
        public layoutService: PepLayoutService,
        public translate: TranslateService
    ) {
        //this.scripts.forEach((item) => {

            // const len = $('script').filter(() => {
            //     return $(this).attr('src') == item;
            // }).length;



            // if (len === 0) {
                // const script = document.createElement('script');
                // script.type = 'text/javascript';
                // script.src = item;
                // this.renderer.appendChild(document.body, script);
            // }

        //});
        this.layoutService.onResize$.subscribe(size => {
            
        });
    }

    ngOnInit() {
        this.renderMap();
        
    }

    loadMap = () => {
        var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
          center: {lat: 32.184448, lng: 34.870766},
          zoom: 2
        });
        
       
        const image = "https://yonatankof.com/misc/pepp/Pepperi%20-%20Icon%20-%20Green%20on%20White%20Square.png";
        var marker = new window['google'].maps.Marker({
          position: {lat: 32.184448, lng: 34.870766},
          map: map,
          title: 'Hello World!',
          draggable: true,
          animation: window['google'].maps.Animation.DROP,
          icon: image
        });
     
        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="thirdHeading" class="thirdHeading">laratutorials.com</h3>'+
        '<div id="bodyContent">'+
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>'+
        '</div>'+
        '</div>';
     
        var infowindow = new window['google'].maps.InfoWindow({
          content: contentString
        });
     
          marker.addListener('click', function() {
            infowindow.open(map, marker);
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

    ngAfterViewInit(): void {
        // Load google maps script after view init
        // const DSLScript = document.createElement('script');
        // DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCfG-8KGkjaSMWDAugbAjgChKPw2Tg6I1c';
        // DSLScript.type = 'text/javascript';
        // document.body.appendChild(DSLScript);
        // document.body.removeChild(DSLScript);
      }

    openDialog() {
        
    }
}

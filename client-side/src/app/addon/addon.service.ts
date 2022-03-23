import { Observable } from 'rxjs';
import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import { PepHttpService, PepSessionService } from '@pepperi-addons/ngx-lib';


@Injectable({ providedIn: 'root' })
export class AddonService {

    accessToken = '';
    parsedToken: any
    papiBaseURL = ''
    addonUUID;

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            addonUUID: this.addonUUID,
            suppressLogging:true
        })
    }

    constructor(
        public session:  PepSessionService,
        private pepHttp: PepHttpService
    ) {
        const accessToken = this.session.getIdpToken();
        this.parsedToken = jwt(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"];
    }


    async getEmployeeDetails(params){

        let body = {
            addonUUID: params.addonUUID,
            userID:  params.userID
        }

        //let res = await this.pepHttp.postHttpCall('http://localhost:4500/api/get_employee_details', body).toPromise(); 
        let res = await this.pepHttp.postPapiApiCall(`/addons/api/${params.pluginUUID}/api/get_employee_details`, body).toPromise(); 
        return res;

    }

    async setEmployeeDetails(params){
        
        let body = {
            UserID:  params.UserID,
            Value:   params.Value//json object with employee details
        } 

        //let res = await this.pepHttp.postHttpCall('http://localhost:4500/api/set_employee_details', body).toPromise(); 
        let res = await this.pepHttp.postPapiApiCall(`/addons/api/${params.pluginUUID}/api/set_employee_details`, body).toPromise(); 
        return res;

    }

   

}

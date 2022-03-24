import { PapiClient, InstalledAddon } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';

class MyService {

    papiClient: PapiClient

    constructor(private client: Client) {
        this.papiClient = new PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey,
            actionUUID: client.AddonUUID
        });
    }

    async createEmployeesTable(client: Client, body: any) {               
        const TABLE_NAME = "EmployeeInfo";
        let configTable;              

        //check if table exist
        try{
             configTable =  await this.papiClient.get(`/addons/data/schemes/${TABLE_NAME}`); 
        }catch(e){
            if(e.message.toLowerCase().indexOf("object id does not exist") !== -1)
            {
                //table does not exist
                configTable = null;
            }
        }        

        if(!configTable){
            //create table
            await this.papiClient.addons.data.schemes.post({
                    Name: TABLE_NAME,        
                    Type: 'meta_data',        
                    Fields: {        
                        Key: {        
                            Type: 'String'        
                        },
                        Value: {
                            Type: 'String'
                        }                      
                    }        
                    })                                                                                                                        
               
        }

         

      }     

      async getEmployeeDetails(body){
          let empDetails;
          if(body?.where){
            empDetails =  await this.papiClient.addons.data.uuid(body.addonUUID).table("EmployeeInfo").find({ where: `UserID='${body.userID}'`});        
          }else{
            empDetails =  await this.papiClient.addons.data.uuid(body.addonUUID).table("EmployeeInfo").find();
          }

          return empDetails;
      }

      async setEmployeeDetails(client: Client,  employeeDetails : any = null)
      {
        //set value to table
        let configObj = {
            Key:   employeeDetails.UserID,
            Value: JSON.stringify(employeeDetails.Value)
        } 
        await this.papiClient.addons.data.uuid(client.AddonUUID).table("EmployeeInfo").upsert(configObj); 

      }
}

export default MyService;
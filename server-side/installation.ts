
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { Relation } from '@pepperi-addons/papi-sdk'
import MyService from './my.service';

export async function install(client: Client, request: Request) {
    const service = new MyService(client);       
    try{            
         let employeeDetails = await service.createEmployeesTable(client, request.body);   
         return {success: true, resultObject: employeeDetails}
     }
     catch(e){
         return {success: false, errorMessage: e.message}    
     }        
 }
 
 export async function uninstall(client: Client, request: Request) {
     return {success: true, resultObject: {}};
 }
 
 export async function upgrade(client: Client, request: Request) {
     const service = new MyService(client);       
     try{             
          let employeeDetails = await service.createEmployeesTable(client, request.body);   
          return {success: true, resultObject: employeeDetails}
      }
      catch(e){
          return {success: false, errorMessage: e.message}    
      }        
 }
 

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}



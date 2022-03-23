import MyService from './my.service'
import { Client, Request } from '@pepperi-addons/debug-server'

export async function get_employee_details(client: Client, request: Request) {
    const service = new MyService(client)
    try {
        const empDetails = await service.getEmployeeDetails(request.body);    
        return {success: true, empDetails}
    
      } catch(e){
        return {success: false, errorMessage: e.message}
    
      }   
    
  };

  export async function set_employee_details(client: Client, request: Request) {
    const service = new MyService(client)
    try {
        const empDetails = await service.setEmployeeDetails(client, request.body );    
        return {success: true, empDetails}
    
      } catch(e){
        return {success: false, errorMessage: e.message}
    
      }   
    
  };

  
  



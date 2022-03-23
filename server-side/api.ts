import MyService from './my.service'
import { Client, Request } from '@pepperi-addons/debug-server'

export async function foo(client: Client, request: Request) {
    const service = new MyService(client)    
    
};


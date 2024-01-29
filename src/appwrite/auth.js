import config from "../config/config";
import {Client, Account, ID} from "appwrite"

export class Authserv{
    Client = new Client();
    account;
    constructor(){
        this.Client.setEndpoint(config.appwiteurl).setProject(config.projectid);    
        this.account = new Account(this.Client);
    }
    
    async login({email,password}){
       return await this.account.createEmailSession(email, password)
    }
    async createaccount({email,name, password}){
            const useraccount = await this.account.create(ID.unique(),email,password,name);
            if (useraccount) return this.login({email, password})
                return useraccount
    }

     
    async getcurrentuser(){
       const currentuser = await this.account.get()
       if (currentuser) return currentuser
        return false
    }

    async logout(){
       return await this.account.deleteSessions();
    }
}

const authserv = new Authserv()

export default authserv
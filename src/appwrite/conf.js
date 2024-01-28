        import config from "../config/config";
import {Client, ID, Databases,Storage,Query} from "appwrite"

export class service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwiteurl)
        .setProject(config.projectid)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createpost({title,slug,content,photoimg,status, userid}){
        console.log(title,slug,content,photoimg,status, userid,"database");
        return await this.database.createDocument(config.databaseid, config.collectionid, slug, {title, content, photoimg, status, userid})
    }

    async updatepost(slug, {title,content,photoimg,status}){
        return await this.database.updateDocument(
            config.databaseid,
            config.collectionid,
            slug,
            {
                title,
                content,
                photoimg,
                status,
            }
        )
    }

    async deletepost(slug){
        const arrow =  await this.database.deleteDocument(
            config.databaseid,
            config.collectionid,
            slug,
        )
        if (arrow) {
            return true
        }
        else{
            return false
        }
    }

    async getpost(slug){
       return await this.database.getDocument(
            config.databaseid,
            config.collectionid,
            slug
        )
    }

    async getallposts(querys = [Query.equal("status","active")]){

       const all =  await this.database.listDocuments(
            config.databaseid,
            config.collectionid,
            querys,
        )
        if (all) return all  
        
         return false
        
    }

    // upload files

    async uploadfile(file){
        return await this.bucket.createFile(
            config.bucketid,
            ID.unique(),
            file,
        )
    }

    async deletefile(fileid){
        return await this.bucket.deleteFile(
            config.bucketid,
            fileid
        )
    }

    getfilepreview(fileid){
        return this.bucket.getFilePreview(
            config.bucketid,
            fileid
        )
    }
}

const serv = new service()
export default serv
// interface Errors{
//     message:string
// }
interface ResponseDbInterface{
    status:number,
    errors?:any,
    data?:any
}
export default class ResponseDB {
    private message:string  = "";
    constructor(private response:ResponseDbInterface) {
        this.updateStatus();
    }
    private updateStatus():void{
        if(this.response.status ==200) {this.message = "Operation was Successfully"; return;}
        if(this.response.status ==400) {this.message = "Bad Request"; return;}
        if(this.response.status ==404) {this.message = "Not Found Request"; return;}
        if(this.response.status ==500) {this.message = "server internal Error"; return;}
    }
    send(){
        return{
            metadata:{
                status:this.response.status,
                message:this.message,
                errors:this.response.errors,
            },
            data:this.response.data
        }
    }
}
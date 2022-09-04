interface ResponseDbInterface{
    status:number,
    errors?:any,
    data?:any
}
export default class ResponseDB {
    private msg:string  = "";
    constructor(private response:ResponseDbInterface) {
        this.updateStatus();
    }
    private updateStatus():void{
        if(this.response.status ==200) {this.msg = "Operation was Successfully"; return;}
        if(this.response.status ==400) {this.msg = "Bad Request"; return;}
        if(this.response.status ==404) {this.msg = "Not Found Request"; return;}
        if(this.response.status ==500) {this.msg = "Internal Server Error"; return;}
    }
    send(){
        return{
            metadata:{
                status:this.response.status,
                msg:this.msg,
                errors:this.response.errors,
            },
            data:this.response.data
        }
    }
}
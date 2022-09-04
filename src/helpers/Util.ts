
export default class Util {
    static x():void{

    }
    static isMongoId(id:string):boolean{
        if(id.match(/^[0-9a-fA-F]{24}$/))
            return true;
        throw new Error('El UUID no es válido');

    }
    static isTextCommon(txt:string){
        if(txt.match(/[^0-9a-zA-Z]/g))
            throw new Error('No puede contener caracteres especiales');
        return true;
    }
    static isEmail(txt:string){
        if(txt.match(/[^0-9a-zA-Z]@/g))
            throw new Error('No puede contener caracteres especiales');
        return true;
    }
    static isNumber(num:number){
        if(!num) return true
        if(num>=1 && num <=100)
            return true;
        throw new Error('solo está permitido un máximo de 100');
    }

    static isDate(date:string){
        const dateWrapper = new Date(date);
        return !isNaN(dateWrapper.getDate());
    }

}

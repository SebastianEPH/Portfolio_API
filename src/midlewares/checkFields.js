function isIDSQL(id){
    if(!id){return false}
    if(id.length< 1 || id.length >8){
        console.log('length', id.length, "el la longitud del id es menor que 1 y mayor que 8 ")
        return false
    }else{
        console.log('El ID SQL se verificó correctamente')
    }
    return !isNaN(id)
}

const checkFields = {};

// regex zone
const baseUrl = /^https|http:\/\//i;
const imgExtension =  /(jpg|jpeg|png|bmp|gif|tif|tiff|SVG$)/ig;

checkFields.isLinkImg = (value, {req, location, path})=>{
    // const reg = new RegExp("this","gi");
    if (value == null || undefined){return true;}

    return baseUrl.test(value) && imgExtension.test(value)

}
checkFields.isLink = (value, {req, location, path})=> {
    if (value == null || undefined){
        value = null;
        return true;
    }
    value = value.trim();
    return baseUrl.test(value) ;
}
checkFields.isIDSQL = (value,{req, location, path}) =>{
    return isIDSQL(value)
}

module.exports = checkFields ;
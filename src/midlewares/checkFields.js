const checkFields = {};

// regex zone
const baseUrl = /^https|http:\/\//i;
const imgExtension =  /(jpg|jpeg|png|bmp|gif|tif|tiff|SVG|$)/ig;

checkFields.isLinkImg = (value, {req, location, path})=>{
    // const reg = new RegExp("this","gi");
    if (value == null || undefined){return true;}

    return baseUrl.test(value) && imgExtension.test(value)

}
checkFields.isLink = (value, {req, res, next})=> {
    if (value == null || undefined){
        value = null;
        return true;
    }
    value = value.trim();
    return baseUrl.test(value) ;
}

module.exports = checkFields ;
helpers = {}
helpers.parse = {}

helpers.parse.IdForDB =  (words) =>{
    const obj = {passed:true, message: "the data is id", status:200}

    if(words === null || words === undefined ||words.length === 0 ){
        obj.passed = false
        obj.message = "Error fatal en el server, contacte con el soporte técnico "
        obj.status = 500
    }else{
        words.forEach(word =>{
            if (word === undefined || word === null ){
                obj.passed = false
                obj.message = "El ID del params enviado es undefined o null "
                obj.status = 400
            }else if(isNaN(word)){
                obj.passed = false
                obj.message = "El ID enviado no es un número"
                obj.status = 400
            } else if (word.toString().trim() === ""){
                obj.passed = false
                obj.message = `El ID enviado de la posición ${words.indexOf(word)} está vacio, porfavor actualice la página`
                obj.status = 400
            }
        })
    }
    return obj
}


module.exports = helpers;


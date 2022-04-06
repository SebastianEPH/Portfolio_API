helpers = {}
helpers.parse = {}
helpers.DB = {}

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
helpers.parse.ObjDB = (objBody, letters=[], FK_ID=[], ID=[]) => {
    const obj = {data: {}, passed:true, message: "parse ok", status:200}

    if(Object.keys(objBody).length === 0){
        obj.passed = false
        obj.message = "Error, no se está enviando nugún valor del, req.body"
        obj.status = 402
        return obj
    }else if(objBody === null || objBody === undefined){
        obj.passed = false
        obj.message = "Error fatal en el server, contacte con el soporte técnico "
        obj.status = 500
        return obj
    }
    Object.entries(objBody).forEach(([key, value]) => {
        letters.forEach(word=>{
            if(word === key){
                console.log(word, " => ", value)
                obj.data[key]= value === undefined || value=== null? null: value.toString().trim()
            }
        })
        FK_ID.forEach(word=>{// only Values ForenKey, because 0 or "" are return as null
            if(word === key){
                console.log(word, " => ", value)
                obj.data[key] = value==="" || value === undefined || value=== null || value === 0 ||value ==='0' ? null:value.toString().trim()
            }
        })
        ID.forEach(word=>{// only ID
            if(word === key){
                console.log(word, " => ", value)
                if(value==="" || value === undefined || value=== null || value === 0 ||value ==='0'){
                    console.log("Error Un ID necesario está vacio")
                    obj.passed = false
                    obj.message = "Error Un ID necesario está vacio"
                    obj.status = 402
                }else{
                    obj.data[key] = value
                }
            }
        })
    });

    if((Object.keys(obj.data).length === 0)){
        console.log("no hubo ninguna coinicdencia los datos enviados, con los datos que recivve")
        obj.passed = false
        obj.message = "submitted fields do not match database "
        obj.status = 402
    }
    return  obj
}

helpers.DB.responseAdd =(response)=>{
    return responseDBType(response, "add");
}
helpers.DB.responseDel =(response)=>{
    return responseDBType(response, "del");
}
helpers.DB.responseUpd =(response)=>{
    return responseDBType(response, "upd");
}
helpers.DB.responseDBGet =(response)=>{
    return responseDBType(response, "get");
}
responseDBType = (response,nameType)=>{
    const type={
        add:{
            successfully:"Se agregó correctamente",
            permissions:"No tienes los permisos necesarios para agregar o no existe el item",
            noUpdate:"no changed to update",
        },
        upd:{
            successfully:"Se actualizó correctamente",
            permissions:"No tienes los permisos necesarios para actualizar o no existe el item",
            noUpdate:"no changed to update",
        },
        del:{
            successfully:"Se eliminó correctamente",
            permissions:"No tienes los permisos necesarios para eliminar o no existe el item",
        }
    }
    console.log("esto nes el res completo",response)
    const obj = { passed:true, message: "", status:200}
    if(response.serverStatus ===2 ){
        if(response.affectedRows === 0  ){
            obj.passed = false
            obj.message = type[nameType].permissions
            obj.status = 406
        }else if(response.affectedRows === 1 || response.insertId !== 0 ) {
            obj.passed = true
            obj.message = type[nameType].successfully
            obj.status = 200
        }else if(response.affectedRows === 1 || response.insertId !== 0 ){
            obj.passed = true
            obj.message = type[nameType].successfully
            obj.status = 200
        }else{
            console.log("No hubo datos que actualizar")
            obj.passed = true
            obj.message = type.add.noUpdate
            obj.status = 202
        }
    }
    console.log(obj.message, response)
    return obj
}

module.exports = helpers;


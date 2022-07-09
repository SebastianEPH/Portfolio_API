responseMessage = {}

// SP = Store Procedure
responseMessage.get = (response) =>{
    const status = response[0].length >= 1 ? 200 : 404;
    return {status, data:response[0] }
}
responseMessage.getOnly = (response) =>{
    const status = response[0].length >= 1 ? 200 : 404;
    return {status, data:response[0][0] || []}
}
responseMessage.add = (response) =>{
    let msg = '';
    let ok= true;
    let status = 200;

    if(response.serverStatus ===2 ){
        if(response.affectedRows === 0  ){
            ok = false
            msg = "No se pudo agregar un nuevo dato, quizas no exista el id que hace referencia"
            status = 406
        }
        if(response.affectedRows === 1){
            ok = true;
            msg = "Was added successfully";
            status = 200;
        }
        if(response.affectedRows > 1 ){
            ok = true;
            msg = "Were added successfully";
            status = 200;
        }
    }else{
        ok = false;
        msg = "Server Database Error";
        status = 500;
    }

    return {
        ok,
        status,
        msg
    }
}
responseMessage.update = (response)=>{
    let msg = '';
    let ok= true;
    let status = 200;

    if(response.serverStatus ===2 ){
        if(response.affectedRows === 0  ){
            ok = false
            msg = "Error, id not exists "
            status = 406
        }
        if(response.affectedRows === 1){
            ok = true;
            msg = "Was update successfully";
            status = 200;
        }
        if(response.affectedRows > 1 ){
            ok = true;
            msg = "Were updated successfully";
            status = 200;
        }
    }else{
        ok = false;
        msg = "Server Database Error";
        status = 500;
    }
    return {
        ok,
        status,
        msg
    }
}
responseMessage.remove = (response)=>{
    let msg = '';
    let ok= true;
    let status = 200;
    console.log(response)

    if(response.serverStatus ===2 ){
        if(response.affectedRows === 0  ){
            ok = false
            msg = "Error, id not exists "
            status = 406
        }
        if(response.affectedRows === 1){
            ok = true;
            msg = "Was removed successfully";
            status = 200;
        }
        if(response.affectedRows > 1 ){
            ok = true;
            msg = "Were removed successfully";
            status = 200;
        }
    }else{
        ok = false;
        msg = "Server Database Error";
        status = 500;
    }
    return {
        ok,
        status,
        msg
    }
}

module.exports = responseMessage;
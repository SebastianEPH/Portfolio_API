responseMessage = {}

// SP = Store Procedure

responseMessage.addSP = (response) =>{
    console.log("Add store procedure: ", response);
    let msg = '';
    let ok= true;
    let status = 200;

    if(response.serverStatus ===2 ){
        if(response.affectedRows === 0  ){
            ok = false
            msg = "No tienes los permisos para agregar los valores o ocurrio un problema "
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
responseMessage.add = (response) =>{
    return responseMessage.addSP(response)
}




module.exports = responseMessage;
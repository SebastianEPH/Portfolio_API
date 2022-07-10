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
    return {ok, status, msg}
}
responseMessage.update = (response)=>{
    let msg = '';
    let ok= true;
    let status = 200;

    if(response.serverStatus ===2 ){
        if(response.affectedRows === 0  ){
            ok = false
            msg = "Error, el id que hace referencia no existe " // tratar de ser más especifico.
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
            msg = "Error ,El id que usted hace referencia no existe "
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
    return { ok, status, msg }
}
responseMessage.err = (err)=>{
    console.log("Err=> ", err)
    let msg = 'Error desconocido';
    if(err.code === "ER_NO_REFERENCED_ROW_2" && err.errno === 1452){
        msg="ID Llave foranea erronea";
    }
    if (err.code === "ECONNREFUSED"){
        msg= "Error de connexión";
    }
    return {
        ok:false,
        errors: {
            sql:{
                msg,
                code: err.code,
                sql_msg: err.sqlMessage || err.syscall,
                sqlState:err.sqlState,
                address: err.address
            }
        }
    }

}

module.exports = responseMessage;
class ApiError {
    constructor(
        statusCode,
        message="Something went wrong",
        error= [],
        stack= ""
    ){
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.success = false;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this.constructor,this);
        }
    }
}


export default ApiError;
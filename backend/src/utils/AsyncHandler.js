function AsyncHandler(requestHandle){
    return function(req,res,next){
        Promise
        .resolve(requestHandle(req,res,next))
        .catch(error => next(error))

    }

}

export default AsyncHandler;
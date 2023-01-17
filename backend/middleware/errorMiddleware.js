
const errorHandlingMiddleware = (error, req, res, next) => {
    console.log(error);
    const statusCode = res.statusCode ? res.statusCode : 500; 

    return res.status(statusCode).json({
        message: error.message || "Something went Wrong!"
    })
}

module.exports = errorHandlingMiddleware;
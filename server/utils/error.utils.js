// this error.utils.js file is made for reusing the error response where it want

//class AppError extends Error means-->AppError class inherits all the properties and behavior of Error class.
class AppError extends Error {
    constructor(message, statusCode){
        
        super(message) // This line calls the constructor of the parent class (Error) with the message parameter.

        this.statusCode = statusCode; //This line assigns the statusCode parameter passed to the constructor to the statusCode property of the AppError instances.

        //this helps to finds the error on server
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError;
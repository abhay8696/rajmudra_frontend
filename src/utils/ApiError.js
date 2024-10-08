// class ApiError extends Error {
//     constructor(statusCode, message, isOperational = true, stack = "") {
//         super(message);
//         this.statusCode = statusCode;
//         this.isOperational = isOperational;
//         if (stack) {
//             this.stack = stack;
//         } else {
//             Error.captureStackTrace(this, this.constructor);
//         }
//     }
// }

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;

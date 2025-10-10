const { TokenExpiredError } = require("jsonwebtoken")
class ErrorHelper {
  static async sendError({ res, error, errorMessage, code }) {
    const { statusCode = 500, message, errors } = error;
    const errMessage = errorMessage || message;

    if (error instanceof TokenExpiredError) {
      console.log('@@@@@@@@@@@ ->AAAAAAAAAAAAAA:', TokenExpiredError);
      return res.status(statusCode).send({
        success: false,
        errorMessage: 'Unauthorized',
        errors,
        statusCode: 401
      })
    }
    if (code) {
      console.log('@@@@@@@@@@@ ->BBBBBBBBBBBBB:', code);
      const error = res.status(code).send({
        success: false,
        errorMessage: message,
        errors,
        code
      });
      return error;
    }
    console.log('@@@@@@@@@@@ ->CCCCCCCCCCCCCC:', statusCode);
    return res.status(statusCode).send({
      success: false,
      errMessage,
      errors,
      statusCode
    });
  };
  static async sendSuccess({ res, data, code }) {
    return res.status(code).send({
      success: true,
      data,
      statusCode: code
    })
  }
}
module.exports = ErrorHelper;
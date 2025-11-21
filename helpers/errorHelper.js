const { TokenExpiredError } = require("jsonwebtoken")
class ErrorHelper {
  static async sendError(res, error, statusCode) {
    if (error instanceof TokenExpiredError) {
      return res.status(statusCode).json({
        success: false,
        error: 'Unauthorized',
        statusCode: 401
      })
    }
    return res.status(statusCode).json({
      success: false,
      error,
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
module.exports = errorHandler = (error, req, res, next) => {
  let status = error.status || 500
  let message = error.message || "Internal server error"

  switch (error.name) {
    case "InvalidInput":
      status = 400
      message = "Invalid input"
      break;

    case "InvalidEmailorPassword":
      status = 400
      message = "Invalid email or password"
      break;

    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400
      message = error.errors.map(error => {
        return error.message
      })
      break;

    case "InvalidToken":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;

    case "PleaseLogin":
      status = 401;
      message = "Please login first";
      break;

    case "UserNotFound":
      status = 401;
      message = "User not found";
      break;

    case "Forbidden":
    case "InvalidRole":
      status = 403
      message = "Unauthorized access"
      break;

    case "NotFound":
      status = 404
      message = "Data not found"
      break;
  }

  res.status(status).json({ message })
}
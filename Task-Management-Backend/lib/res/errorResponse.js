function errorResponse(success = false, message, error, statusCode) {
  return {
    statusCode,
    success,
    message,
    error,
  };
}

export default errorResponse;

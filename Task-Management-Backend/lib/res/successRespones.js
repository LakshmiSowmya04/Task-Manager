function successResponse(success = true, message, data = {}, statusCode) {
  return {
    success,
    message,
    data,
    statusCode,
  };
}
export default successResponse;

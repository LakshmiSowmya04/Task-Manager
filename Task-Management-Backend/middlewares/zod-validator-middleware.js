import errorResponse from "../lib/res/errorResponse.js";
import StatusCodes from "http-status-codes";
const zValidateRequest =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (e) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          errorResponse(false, e.message, e.errors, StatusCodes.BAD_REQUEST)
        );
    }
  };
export default zValidateRequest;

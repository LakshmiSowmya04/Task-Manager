import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const healthcheck = asyncHandler(async (req, res) => {
    try {
        return res
            .status(200)
            .json(new ApiResponse(200, null, "My health is ok"));
    } catch (error) {
        throw new ApiError(500, "Internal Server Error");
    }
});

export { healthcheck };

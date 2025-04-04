import { asyncHandler } from "../utils/asyncHandler";

const healthCheck = asyncHandler( async (req, res) => {

  return res.status(200).json({
    message: "Health Check Passed"
  });

});

export { healthCheck };
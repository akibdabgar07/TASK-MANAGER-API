// const logger = require("../utils/logger.util");
const jwtUtil = require("../utils/jwt.util");

module.exports = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decoded = await jwtUtil.verifyAccessToken(token);
      req.user = decoded; // Attach the decoded token information to the request
      req.token = token;
      email = decoded?.email || null;
    }

    // const userId = email || "Unknown user";
    // logger.error(
    //   `User ID: ${userId} | API Url: ${req?.url || null} | Error occurred: ${
    //     err.data?.message
    //   }`,
    //   {
    //     stack: err.stack,
    //   }
    // );
    res.status(err?.code || 500).json({
      status: err?.status || "error",
      message: err.data?.message || "Something went wrong.",
    });
  }
};

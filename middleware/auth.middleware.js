// const cacheUtil = require("../utils/cache.util");
const jwtUtil = require("../utils/jwt.util");
const UserModel = require("../model/user");

module.exports = async (req, res, next) => {
  // Extract the token from the Authorization header
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Remove the 'Bearer ' prefix from the token
  }

  // If a token is present
  if (token) {
    try {
      token = token.trim();
      console.log(token, "token");

      // // Check if the token is blacklisted
      // const isBlacklisted = await cacheUtil.get(token);
      // console.log(isBlacklisted, "isBlacklisted");
      // if (isBlacklisted) {
      //   return res.status(401).json({ message: "Unauthorized" }); // Respond with Unauthorized if token is blacklisted
      // }

      // Verify the access token
      const decoded = await jwtUtil.verifyAccessToken(token);
      req.user = decoded; // Attach the decoded token information to the request
      req.token = token;
      var email = decoded?.email || null;

      // Fetch the user by email
      const user = await UserModel.findOne({
        where: {
          email: email,
        },
      });

      // Attach the user's username or email to the request body
      req.body.user_id = user?.username || email;
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" }); // Respond with Unauthorized if there's an error
    }
  } else {
    // Respond with a 400 status if the Authorization header is missing
    return res.status(400).json({ message: "Authorization header is missing" });
  }
};

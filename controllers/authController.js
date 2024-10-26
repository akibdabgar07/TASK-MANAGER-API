const bcrypt = require("bcrypt");
const jwtUtil = require("../utils/jwt.util");
const User = require("../model/user.js");
const dotenv = require("dotenv");
const AuthServices = require("../services/auth.services.js");
const bcryptUtil = require("../utils/bcrypt.util.js");
const jwtConfig = require("../config/jwt.config.js");
// const logger = require("../utils/logger.util.js");

dotenv.config();



exports.register = async (req, res) => {
  // Check if email already exists
  const isExist = await AuthServices.findUserByEmail(req.body.email);
  if (isExist) {
    return res.status(400).json({
      message: "Given email already exists.",
    });
  }

  // Hash Password
  const hashedPassword = await bcryptUtil.createHash(req.body.password);

  // Prepare user data
  const userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    password: hashedPassword,
    lastName: req.body.lastName,
    isAdmin: req.body.isAdmin,
  };

  // Create a new user
  const user = await AuthServices.createUser(userData);
  const userId = user?.id || 0;

  // Remove password from the user object before sending the response
  delete user.password;

  return res.json({
    data: user,
    message: "Success",
  });
};

exports.login = async (req, res) => {
  // Find user by email
  const user = await AuthServices.findUserByEmail(req.body.email);

  // Check if user exists
  if (user) {
    // Compare password with the stored hash
    const isMatched = await bcryptUtil.compareHash(
      req.body.password,
      user.password
    );
    if (isMatched) {
      const userData = {
        id: user.id,
        email: user.email,
      };

      const expiresIn = jwtConfig.tokenTLL;

      // Create an access token
      const accessToken = await jwtUtil.createAccessToken(userData, expiresIn);

      // Create a refresh token
      const refreshToken = await jwtUtil.createRefreshToken(userData);

      // Assign refresh token in http-only cookie
      res.cookie("jwtRefreshToken", refreshToken, {
        httpOnly: true,
        //sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      // logger.info("Login success");

      return res.json({
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: expiresIn,
        message: "Success",
      });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } else {
    return res.status(400).json({ message: "Invalid email" });
  }
};

const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

// Verify Access Token
exports.verifyAccessToken = (token) => jwt.verify(token, jwtConfig.tokenSecret);

// Create Access Token
exports.createAccessToken = (data, expiresIn) =>
  jwt.sign(data, jwtConfig.tokenSecret, { expiresIn: expiresIn });

// Verify Refresh Token
exports.verifyRefreshToken = (token) =>
  jwt.verify(token, jwtConfig.refreshTokenSecret);

// Create Refresh Token
exports.createRefreshToken = (data) =>
  jwt.sign(data, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenTTL,
  });

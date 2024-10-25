module.exports = {
  tokenSecret: process.env.JWT_TOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  tokenTLL: "1d",
  refreshTokenTTL: "3d",
};

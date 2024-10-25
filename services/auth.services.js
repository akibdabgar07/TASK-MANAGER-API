const UserModel = require("../model/user");
const cacheUtil = require("../utils/cache.util");

/**
 * Create new user
 * @param {Object} user - The user data to be created
 * @returns {Promise} - The created user
 */
exports.createUser = (user) => {
  return UserModel.create(user);
};

/**
 * Get user by email
 * @param {string} email - The email of the user to find
 * @returns {Promise} - The user found by email
 */
exports.findUserByEmail = (email) => {
  return UserModel.findOne({
    where: {
      email: email,
    },
  });
};

/**
 * Get user by ID
 * @param {number} id - The ID of the user to find
 * @returns {Promise} - The user found by ID
 */
exports.findUserById = (id) => {
  return UserModel.findByPk(id);
};

/**
 * User logged out
 * @param {string} token - The token to be blacklisted
 * @param {number} exp - The expiration time of the token in seconds
 * @returns {Promise} - The result of blacklisting the token
 */
exports.logoutUser = (token, exp) => {
  const now = new Date();
  const expire = new Date(exp * 1000);
  const milliseconds = expire.getTime() - now.getTime();
  // Blacklist Token
  return cacheUtil.set(token, token, milliseconds);
};

/**
 * Save User Info
 * @param {Object} req - The request object containing user data
 * @returns {Promise} - The result of updating the user info
 */

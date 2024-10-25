const express = require("express");
const AuthControlller = require("../controllers/authController");
const schema = require("../validations/register.validation");
const router = express.Router();
const validate = require("../utils/validator.util");
// const authMiddleware = require("../middleware/auth.middleware");
const ErrorHandler = require("../middleware/error.middleware");

router.post(
  "/register",
  validate(schema.registerInfo),
  ErrorHandler(AuthControlller.register)
);
router.post(
  "/login",
  validate(schema.login),
  ErrorHandler(AuthControlller.login)
);

module.exports = router;

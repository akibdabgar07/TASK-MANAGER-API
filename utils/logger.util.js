const winston = require("winston");
const path = require("path");
const fs = require("fs");
const logsDir = "public/logs";

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Generate timestamp for the filename
const timestamp = new Date().toISOString().slice(0, 10).replace(/:/g, "-"); // Replacing `:` to avoid issues in file names

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => new Date().toISOString().replace("T", " ").substring(0, 19), // UTC Time Default
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    // Error logs with timestamp in the filename
    new winston.transports.File({
      filename: path.join(logsDir, `error-${timestamp}.log`),
      level: "error",
    }),
    // Combined logs
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
    }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.APP_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;

const express = require("express");
const glErrors = require("../CommonUtil/glErrors");
const apiLogin = require("../GLCM/GLCM001");
const apiMenu = require("../GLCM/GLCM003");
const apiAccessRight = require("../GLCM/GLCM004");

require("express-async-errors");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/login", apiLogin);
  app.use("/api/Menu", apiMenu);
  app.use("/api/AccessRight", apiAccessRight);
  app.use(glErrors);
};

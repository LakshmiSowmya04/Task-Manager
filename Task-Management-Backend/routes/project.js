const express = require("express");
const ProjectController = require("../controllers/project-controller");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth-middleware");

router.post("/", AuthMiddleware, ProjectController.create);

router.get("/", AuthMiddleware, ProjectController.get);

module.exports = router;

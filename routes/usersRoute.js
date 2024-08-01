const express = require("express");
const {register, login, getLoggedInUser} = require("../controllers/auth");
const requireSignIn = require("../middlewares/auth");

// routes related to user

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logged-in-user", requireSignIn, getLoggedInUser);

module.exports = router;
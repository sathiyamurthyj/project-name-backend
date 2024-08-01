const express = require("express");
const requireSignIn = require("../middlewares/auth");
const {addNotification, getAllUserNotifications, markAsReadNotifications, deleteReadNotifications} = require("../controllers/notification");
const router = express.Router();

// routes related to notification

router.post("/add-notification", requireSignIn, addNotification);

router.get("/user-notifications", requireSignIn, getAllUserNotifications);

router.post("/mark-read-notifications", requireSignIn, markAsReadNotifications);

router.delete("/delete-read-notifications", requireSignIn, deleteReadNotifications);


module.exports = router;
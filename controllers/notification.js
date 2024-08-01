const Notification = require("../models/notification");

// controller to add a new notification
const addNotification = async(req,res)=>{
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.json({
            success: true,
            message:"Notification added successfully",
            notification: notification
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// controller to get all notifications received for logged in user
const getAllUserNotifications = async(req,res)=>{
    try {
        const notifications = await Notification.find({
            user:req.user._id
        }).sort({createdAt:-1});
        res.json({
            success: true,
            notifications: notifications
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// controller to mark notifications as read in order to remove notification count
const markAsReadNotifications = async(req,res)=>{
    try {
        await Notification.updateMany({
            user:req.user._id,
            read: false,
        },
        {
            read: true,
        }
    );
        const notifications = await Notification.find({
            user:req.user._id
        }).sort({createdAt:-1});
        res.json({
            success: true,
            message: "notifications marked as read",
            notifications:notifications
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// controller to delete all read notifications
const deleteReadNotifications = async(req,res)=>{
    try {
        await Notification.deleteMany({
            user:req.user._id
        });
        res.json({
            success: true,
            message: "Read Notifications Deleted"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {addNotification, getAllUserNotifications, markAsReadNotifications, deleteReadNotifications};
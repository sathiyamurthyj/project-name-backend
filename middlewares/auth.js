const jwt = require("jsonwebtoken");

// gets the looged in user from jwt token for accessing pages requiring login
const requireSignIn = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = requireSignIn;
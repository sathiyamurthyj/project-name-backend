const bcrypt = require("bcryptjs");

// password input by user is hashed and saved to db
const hashPassword = (password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12,(err, salt)=>{
            if(err){
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash);
            })
        })
    })
};

// compares user input password with hashed password in db for logging in to app
const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
};

module.exports = {hashPassword, comparePassword};
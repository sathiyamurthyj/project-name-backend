const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const usersRoute = require("./routes/usersRoute");
const projectsRoute = require("./routes/projectsRoute");
const tasksRoute = require("./routes/tasksRoute");
const notificationsRoute = require("./routes/notificationsRoute");
const app = express();

dotenv.config();

// middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// routes
app.use("/api/users", usersRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/notifications", notificationsRoute);


const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})

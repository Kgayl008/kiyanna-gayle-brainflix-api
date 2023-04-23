const express = require("express");
const app = express();
const cors = require('cors')
const videosRoutes = require('./routes/videos')
require('dotenv').config()
const { PORT } = process.env

// Use cors middleware to allow cross-origin requests
app.use(cors())

// Parse JSON request body
app.use(express.json());

// Define a middleware function
app.use((req, res, next) => {
    console.log('Hola Middleware');
    next();
});

// Serve static files in the public-images directory
app.use("/public-images", express.static("./public"));

// Define routes for videos
app.use("/videos", videosRoutes);

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

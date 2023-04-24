const express = require("express");
const app = express();
const cors = require('cors')
const videosRoutes = require('./routes/videos')
// require('dotenv').config()
// const { PORT } = process.env.PORT || 3000;

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
app.use("/videos", express.static("/public-images"));

// Define routes for videos
app.use("/videos", videosRoutes);
app.use("/videos/:id", videosRoutes)

// Start the server
app.listen(8080, () => {
    console.log(`Server is running on port `);
});

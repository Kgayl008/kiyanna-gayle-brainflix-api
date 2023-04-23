const express = require('express');
const app = express();
const router = express.Router() 
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');



function readVideosFile() {
    const videoList = fs.readFileSync("./data/videos.json");
    const parsedData = JSON.parse(videoList);
    return parsedData;
}

router.get("/", (req, res, next) => {
    const videos = readVideosFile();
    res.json(videos);
});

router.get('/videos/:id', (req, res) => {
    const videoId = [req.params.id];
    const video = videos.find(video => video.id === videoId);
    if (video) {
        res.json(video);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
});

router.post("/", (req, res) => {    
    console.log(req.body);
    const newVideo = {
        id: uuidv4(),
        image:req.body.image,
        title: req.body.title,
        channel: req.body.channel,
    };
    const videos = readVideosFile();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.status(201).json(newVideo);
});

module.exports = router;


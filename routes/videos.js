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
router.get('/:id', (req, res) => {
    const videos = readVideosFile();
    // const videoId = req.params.id;
    const video = videos.find((video) => video.id === req.params.id);
    if (video) {
        res.json(video);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
});


router.post("/comments", (req, res) => {    
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


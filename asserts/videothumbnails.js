const { spawn } = require('child_process');
const { createWriteStream } = require('fs');
const Video = require('../models/video');
const ffmpegPath = 'C:ffmpeg/bin/ffmpeg.exe';
const width = 256;
const height = 144;
const generateThumbnail = (target, title, username) => {
  title = title.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '');
  let tmpFile = createWriteStream('media/uploads/video_thumbnails/' + title + '.jpg');
  const ffmpeg = spawn(ffmpegPath, [
    '-ss',
    20,
    '-i',
    target,
    '-vf',
    `thumbnail,scale=${width}:${height}`,
    '-qscale:v',
    '2',
    '-frames:v',
    '1',
    '-f',
    'image2',
    '-c:v',
    'mjpeg',
    'pipe:1'
  ]);
  ffmpeg.stdout.pipe(tmpFile);
  const videoDetails = new Video({
    uploader_name: username,
    upload_title: title,
    video_path: target,
    // thumbnail_path: 'https://pixel-stream.herokuapp.com' + '/api/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
    // thumbnail_path: '*' + '/api/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
    thumbnail_path: 'http://localhost:5000' + '/api/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
  });
  videoDetails
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  generateThumbnail: generateThumbnail
}
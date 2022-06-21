var FfmpegCommand = require('fluent-ffmpeg');
var command = new FfmpegCommand();

var command = ffmpeg(fs.createReadStream('/path/to/file.avi'));
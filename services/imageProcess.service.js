const fs = require('fs');
const path = require('path')
const sharp = require('sharp');


let filepath = path.join(__dirname, '../img.jpg');
let destpath = path.join(__dirname, '../img-dest.jpg');

let readableStream = fs.createReadStream(filepath);
let writableStream = fs.createWriteStream(destpath);


const svg = `
    <svg width="373" height="500">
      <style>
      .title { fill: #001; font-size: 20px; font-weight: bold;}
      </style>
      <text x="70%" y="6%" text-anchor="middle" class="title">
      Hello
      </text>
    </svg>
    `;


var transformer = sharp()
    .composite([
        {
            input: Buffer.from(svg),
            top: 190,
            left: 0,
        },
        {
            input: fs.readFileSync(filepath),
            top: 200,
            left: 20,
        },
    ])
    .toFormat("jpeg", { mozjpeg: false }) // compressed image
    .on('info', function (info) {
        console.log('Image height is ', info);
    });

readableStream.pipe(transformer).pipe(writableStream);
const express = require('express');
const fs = require('fs-extra');
const { fileParser } = require('express-multipart-file-parser');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const TEMP_DIR = 'tmp';

const app = express();
app.use(
  fileParser({
    rawBodyOptions: {
      limit: '5mb'
    }
  })
);
app.use(express.static(__dirname + '/tmp'));

exports.resizeImage = app.post('/', (req, res) => {
  if (!req.files) {
    res.status(400).send('No file uploaded');
    return;
  }

  const { mimetype, buffer } = req.files[0];
  const width = parseInt(req.query.width || 1024);

  if (!mimetype.includes('image')) {
    res.status(400).send('File is not an image');
    return;
  }

  const extension = mimetype.split('/')[1];
  const fileName = `${uuidv4()}.${extension}`;
  const fileAbsolutePath = `${__dirname}/${TEMP_DIR}/${fileName}`;

  fs.mkdirsSync(TEMP_DIR);

  sharp(buffer)
    .resize(width)
    .toFile(fileAbsolutePath)
    .then(() => {
      res.status(200).sendFile(fileAbsolutePath);
      setTimeout(() => {
        fs.rmSync(fileAbsolutePath);
      }, 1000);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

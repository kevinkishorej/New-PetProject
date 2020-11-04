const express = require('express');
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose')
var Grid = require('gridfs-stream');
const crypto = require('crypto');

  

const mongoURI =("mongodb+srv://kevin:jobs@420@cluster0.noh1o.mongodb.net/online-petshop?retryWrites=true&w=majority", {useUnifiedTopology: true});


const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

module.exports = upload;

const multer = require('multer');
const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Shoes",
        format: async (req, file) => {
            "jpg", "png";
        }, // supports promises as well
        public_id: (req, file) => {
            console.log(
                new Date().toISOString().replace(/:/g, "-") + file.originalname
            );
            return (
                new Date().toISOString().replace(/:/g, "-") + file.originalname
            );
        },
    },
});

module.exports = multer({ 
    storage: storage ,
    fileFilter:(req,file,cb)=>{
        if(file){
            cb(null,true)
        }
    }
});
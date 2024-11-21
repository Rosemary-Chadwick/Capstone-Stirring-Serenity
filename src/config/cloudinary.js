const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "stirring-serenity",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [
      { width: 1000, height: 1000, crop: "limit" }, // max size for full images
    ],
  },
});

const thumbnailStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "stirring-serenity-thumbnails",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [
      { width: 300, height: 300, crop: "fill" }, // thumbnail size
    ],
  },
});

const parser = multer({ storage: storage });
const thumbnailParser = multer({ storage: thumbnailStorage });

module.exports = { cloudinary, parser, thumbnailParser };

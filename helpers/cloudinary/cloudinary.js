const cloudinary = require("./cloudinaryConfig.js");
const HttpError = require("../HttpError.js");
const fs = require("fs");

const cloudinaryImgSave = async (file, params, destFolder) => {
  const { path: oldPath, filename } = file;

  cloudinary.url(filename, params);

  const fileData = await cloudinary.uploader.upload(oldPath, {
    folder: destFolder,
    use_filename: true,
  });

  fs.unlink(oldPath, (err) => {
    if (err) {
      throw new HttpError(500, "Server can not delete the temp file");
    }
  });

  return fileData;
};

module.exports = cloudinaryImgSave;

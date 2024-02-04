import imageService from "../Services/imageService";
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../RefreshToken/refreshTokenFrontend/public/images/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const uploadFunc = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(200).json({
        EM: "Cannot put image",
        EC: 2,
        DT: [req.file],
      });
    } else {
      if (
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpg" ||
        req.file.mimetype === "image/jpeg"
      ) {
        const data = await imageService.updateAvatar(req.file, req.body);
        if (data) {
          return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
          });
        }
      } else {
        return res.status(200).json({
          EM: "Only upload type of image : png, jpg, jpeg",
          EC: 2,
          DT: [req.file.mimetype],
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const getImage = async (req, res) => {
  try {
    const data = await imageService.getImageByEmail(req.body);
    if (data) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = { storage, upload, uploadFunc, getImage };

const imageController = require("../controller/imageController");

const imageRoutes = (router, JwtAction) => {
  router.all("*", JwtAction.checkUserJwt);
  // Upload image
  router.post(
    "/avatar/upload-image",
    imageController.upload.single("image"),
    imageController.uploadFunc
  );
  router.post("/avatar/read", imageController.getImage);
};

export default imageRoutes;

const userController = require("../controller/userController");

const userRoutes = (router, JwtAction) => {
  router.all("*", JwtAction.checkUserJwt);
  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.delete("/user/delete", userController.deleteFunc);
  router.put("/user/update", userController.updateFunc);
  router.get("/account", userController.getUserAccount);
};

export default userRoutes;

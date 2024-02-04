import loginRegisterController from "../controller/loginRegisterController";

const loginRegisterRoutes = (router) => {
  router.post("/register", loginRegisterController.registerController);

  router.post("/login", loginRegisterController.loginController);

  router.post("/logout", loginRegisterController.logoutController);
};

export default loginRegisterRoutes;
  
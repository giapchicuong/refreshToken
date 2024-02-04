import loginRegisterSerVice from "../Services/loginRegisterService";

const registerController = async (req, res) => {
  try {
    const data = await loginRegisterSerVice.registerService(req.body);
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Email / Password is required",
        EC: 1,
        DT: "",
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const loginController = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Email / Password is required",
        EC: 1,
        DT: "",
      });
    }
    const data = await loginRegisterSerVice.loginService(req.body);

    if (data && data.EC === 0 && data.DT.accessToken) {
      res.cookie("accessToken", data.DT.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const logoutController = async (req,res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({
      EM: "Log out success", //error message
      EC: 0, //error code
      DT: "", //date
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};

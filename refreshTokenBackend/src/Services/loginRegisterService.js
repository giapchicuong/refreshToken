import db from "../config/db";
import checkValidService from "./checkValidService";
import JwtAction from "../middleware/JWTAction";
const registerService = async (rawData) => {
  try {
    // Check email exist
    let isEmailExist = await checkValidService.checkEmailExist(rawData.email);
    if (isEmailExist) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }
    // Hass password
    const hassPass = checkValidService.hashPassword(rawData.password);

    const sql =
      "INSERT INTO `user`(`email`, `password`,`username`,`createdAt`,`updatedAt`) VALUES (?, ?, ?, NOW(),NOW())";
    const values = [rawData.email, hassPass, rawData.username];
    const [data, fields] = await db.query(sql, values);
    if (data) {
      return {
        EM: "A user is created successfully",
        EC: 0,
        DT: rawData,
      };
    } else {
      return {
        EM: "A user is created fail",
        EC: 1,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Some thing went wrong in service ...",
      EC: -2,
    };
  }
};
const loginService = async (rawData) => {
  try {
    const sql = "Select * from user where email=?";
    const values = [rawData.email];
    const [data, fields] = await db.query(sql, values);
    if (data.length > 0) {
      const hashedPassword = data[0].password;
      const isCorrectPassword = checkValidService.checkPassword(
        rawData.password,
        hashedPassword
      );
      if (isCorrectPassword) {
        const payload = {
          email: data[0].email,
          avatar: data[0].avatar,
          groupId: data[0].groupId,
        };

        let accessToken = JwtAction.createAccessJwt(payload);
        let refreshToken = JwtAction.createRefreshJwt(payload);
        return {
          EM: "Login successfully",
          EC: 0,
          DT: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            email: data[0].email,
            avatar: data[0].avatar,
          },
        };
      } else {
        return {
          EM: "Your email/phone number or password is incorrect!",
          EC: 1,
          DT: "",
        };
      }
    } else {
      return {
        EM: "Your email/phone number or password is incorrect!",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Some thing went wrong in service ...",
      EC: -2,
    };
  }
};
module.exports = {
  registerService,
  loginService,
};

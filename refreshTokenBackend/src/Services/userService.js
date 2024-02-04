import db from "../config/db";
import checkValidService from "./checkValidService";
const getAllUser = async () => {
  try {
    const sql = "SELECT * FROM user";
    const user = await db.promise(sql);
    if (user) {
      return {
        EM: "Get data success.",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "Get data fail.",
        EC: 1,
        DT: [],
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

const createNewUser = async (rawData) => {
  try {
    // Check email exist
    let isEmailExist = await checkValidService.checkEmailExist(rawData.email);
    if (isEmailExist) {
      return {
        EM: "The email is already exist",
        EC: 1,
        DT: "email",
      };
    }
    // Hass password
    const hassPass = checkValidService.hashPassword(rawData.password);
    const sql =
      "INSERT INTO `user`(`email`, `password`,`username`,`createdAt`,`updatedAt`) VALUES (?, ?, ?, NOW(),NOW())";
    const values = [rawData.email, hassPass, rawData.username];
    const data = await db.promise(sql, values);
    if (data) {
      return {
        EM: "New user created successfully",
        EC: 0,
        DT: rawData,
      };
    } else {
      return {
        EM: "Creating a new user failed",
        EC: 2,
        DT: [],
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
const deleteUser = async (rawData) => {
  try {
    const sql = "DELETE FROM user where id = ? limit 1";
    const values = [rawData.id];
    const data = await db.promise(sql, values);
    console.log(rawData)
    if (data.affectedRows > 0) {
      return {
        EM: "Delete user successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exist",
        EC: 2,
        DT: [],
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

const updateUser = async (rawData) => {
  try {
    const sql = "UPDATE user set username = ? where id = ?";
    const values = [rawData.username, rawData.id];
    const data = await db.promise(sql, values);
    if (data.affectedRows > 0) {
      return {
        EM: "A user updated successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Updated a new user failed",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Some thing went wrong in service ...",
      EC: -2,
    };
  }

  // return new Promise((resolve, reject) => {
  //   const sql =
  //     "UPDATE user set email = ?, username = ?, password = ? where id = ?";
  //   const values = [email, username, password, id];
  //   connection.query(sql, values, (err, result) => {
  //     if (err instanceof Error) {
  //       reject(err);
  //     }
  //     resolve(result);
  //   });
  // });
};

module.exports = {
  getAllUser,
  createNewUser,
  deleteUser,
  updateUser,
};

import db from "../config/db";

const updateAvatar = async (rawDataName, rawData) => {
  try {
    const sql = "UPDATE user set avatar = ? where email = ?";
    const values = [rawDataName?.filename, rawData.email];
    const [data, fields] = await db.query(sql, values);
    if (data.affectedRows > 0) {
      return {
        EM: "Avatar updated successfully",
        EC: 0,
        DT: rawDataName?.filename,
      };
    } else {
      return {
        EM: "Avatar updated failed",
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

const getImageByEmail = async (rawData) => {
  try {
    const sql = "SELECT avatar from user where email = ?";
    const values = [rawData.email];
    const [data, fields] = await db.query(sql, values);
    if (data.length > 0) {
      return {
        EM: "Get a avatar successfully",
        EC: 0,
        DT: data[0],
      };
    } else {
      return {
        EM: "Get a avatar failed",
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
module.exports = { updateAvatar, getImageByEmail };

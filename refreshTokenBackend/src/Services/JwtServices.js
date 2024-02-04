import db from "../config/db";

const getGroupWithRole = async (user) => {
  try {
    const sql = 'SELECT * FROM role where '
  } catch (error) {
    console.log(error);
    return {
      EM: "something went wrong in server...",
      EC: 2,
    };
  }
};

module.exports = { getGroupWithRole };

import axios from "../setup/axios";

const getAllUser = () => {
  return axios.get("/user/read");
};

const createNewUser = (userData) => {
  return axios.post("/user/create", { ...userData });
};

const updatedUser = (userData) => {
  return axios.put("/user/update", { ...userData });
};

const deleteUser = (userData) => {
  return axios.delete("/user/delete", { data: { id: userData.id } });
};

const getUserAccount = () => {
  return axios.get("/account");
};

const updateAvatar = (data) => {
  return axios.post("/avatar/upload-image", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const getAvatar = (userData) => {
  return axios.post("/avatar/read", { email: userData });
};

export {
  getAllUser,
  createNewUser,
  updatedUser,
  deleteUser,
  getUserAccount,
  updateAvatar,
  getAvatar,
};

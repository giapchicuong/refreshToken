import axios from "../setup/axios";

const registerNewUser = (userData) => {
  const { confirmPassword, ...userDataWithoutConfirmPassword } = userData;
  return axios.post("/register", userDataWithoutConfirmPassword);
};

const loginUser = (userData) => {
  const { email, password } = userData;
  return axios.post("/login", { email, password });
};

const logoutUser = () => {
  return axios.post("/logout");
};

export { registerNewUser, loginUser, logoutUser };

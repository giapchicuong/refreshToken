import axios from "axios";
import axiosRetry from "axios-retry";
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

instance.defaults.withCredentials = true;

axiosRetry(instance, {
  retries: 3,
  retryCondition: (error) => {
    return error.response.status === 401 || error.response.status === 405;
  },
  retryDelay: (retryCount) => {
    return retryCount * 100;
  },
});

// // Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return error.response?.data;
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const status = (error && error.response && error.response.status) || 500;
    // switch (status) {
    //   // case 401: {
    //   //   return error.response.data;
    //   // }
    //   case 403: {
    //     return error.response.data;
    //   }
    //   // bad request
    //   case 400: {
    //     return error.response.data;
    //   }
    //   // not found
    //   case 404: {
    //     return error.response.data;
    //   }
    //   // conflict
    //   case 409: {
    //     return error.response.data;
    //   }
    //   // unprocessable
    //   case 422: {
    //     return error.response.data;
    //   }
    //   default: {
    //     return console.error(error);
    //   }
    // }
  }
);

export default instance;

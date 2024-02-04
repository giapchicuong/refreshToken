import express from "express";
import { userRoutes, loginRegisterRoutes } from "./index";
import JwtAction from "../middleware/JWTAction";
import imageRoutes from "./imageRoutes";
const router = express.Router();

const initApiRoutes = (app) => {
  ``;
  // LOGIN / REGISTER
  loginRegisterRoutes(router);

  // USER
  userRoutes(router, JwtAction);

  // Image Upload
  imageRoutes(router, JwtAction);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;

// app.get("/api/v1/user/read", async (req, res) => {
//   const sql = "SELECT * FROM `user`";
//   connection.query(sql, values, (err, result) => {
//     if (err instanceof Error) {
//       console.log(err);
//       return;
//     }
//     return res.send(result);
//   });
// });

// app.post("/api/v1/user/create", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const username = req.body.username;
//   const sql =
//     "INSERT INTO `user`(`email`, `password`,`username`,`createdAt`,`updatedAt`) VALUES (?, ?, ?, NOW(),NOW())";
//   const values = [email, password, username];
//   connection.query(sql, values, (err, result) => {
//     if (err instanceof Error) {
//       console.log(err);
//       return;
//     }
//     return res.send(result);
//   });
// });

// app.delete("/api/v1/user/delete", async (req, res) => {
//   const id = req.body.id;
//   const sql = "DELETE FROM `user` WHERE `id` = ? LIMIT 1";
//   const values = [id];
//   connection.query(sql, values, (err, result) => {
//     if (err instanceof Error) {
//       console.log(err);
//       return;
//     }
//     return res.send(result);
//   });
// });

// app.put("/api/v1/user/update", async (req, res) => {
//   const id = req.body.id;
//   const username = req.body.username;
//   const sql = "UPDATE `user` SET `username` = ? WHERE `id` = ? LIMIT 1";
//   const values = [username, id];
//   connection.query(sql, values, (err, result) => {
//     if (err instanceof Error) {
//       console.log(err);
//       return;
//     }
//     return res.send(result);
//   });
// });

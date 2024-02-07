// import mysql from "mysql2";

// const db = mysql.createConnection({
//   host: "bznfuymgdplsfz0eiirn-mysql.services.clever-cloud.com",
//   database: "bznfuymgdplsfz0eiirn",
//   user: "uemo3uyhpgrfkxtn",
//   password: "DrD80yeCpvxMfuguAwv4",
//   port: 3306,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Connection failed, please try again", err);
//   } else {
//     console.log("Successfully connected to the database!");
//   }
// });
// db.promise = async (sql, values) => {
//   return new Promise((resolve, reject) => {
//     db.query(sql, values, async (err, result) => {
//       if (err) {
//         reject(new Error(`Database query error: ${err.message}`));
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };
// module.exports = db;
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const db = mysql.createPool({
  host: "bznfuymgdplsfz0eiirn-mysql.services.clever-cloud.com",
  database: "bznfuymgdplsfz0eiirn",
  user: "uemo3uyhpgrfkxtn",
  password: "DrD80yeCpvxMfuguAwv4",
  port: 3306,
  Promise: bluebird,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

db.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

export default db;

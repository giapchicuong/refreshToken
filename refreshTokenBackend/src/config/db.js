import mysql from "mysql2";

const db = mysql.createConnection({
  host: "bznfuymgdplsfz0eiirn-mysql.services.clever-cloud.com",
  database: "bznfuymgdplsfz0eiirn",
  user: "uemo3uyhpgrfkxtn",
  password: "DrD80yeCpvxMfuguAwv4",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Connection failed, please try again", err);
  } else {
    console.log("Successfully connected to the database!");
  }
});
db.promise = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(new Error());
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = db;

import express from "express";
import bodyParser from "body-parser";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
const app = express();

const PORT = process.env.PORT || 8080;
// config corn
configCors(app);

// config body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// API
initApiRoutes(app);

app.use((req, res) => {
  return res.status(500).send("404 not found");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

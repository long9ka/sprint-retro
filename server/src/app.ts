import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect } from "mongoose";
import { PORT, DB } from "./config";

// routes
import users from "./routes/api/users";

const app: Application = express();

// connect db
(async (url) => {
  try {
    await connect(url, {
      useCreateIndex      : true,
      useFindAndModify    : true,
      useNewUrlParser     : true,
      useUnifiedTopology  : true,
    });
    console.log("connected database");
  } catch (err) {
    console.error(err.message);
  }
})(DB);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users);
 
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
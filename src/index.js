//require('dotenv').config({path : './env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();

/*// first approach to connect the database
import mongoose from "mongoose";
import Express from "express";
const app = Express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERRR :", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`app is listening on port" ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("error", error);
    throw err;
  }
})();*/

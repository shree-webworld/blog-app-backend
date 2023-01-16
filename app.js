import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectionDB from "./utils/connectionDB.js";
import usersRoute from "./routes/usersRoute.js";
import postRoute from "./routes/postRoute.js";
import Postmodel from "./models/post.js";
// import fs from "fs";

dotenv.config();
mongoose.set('strictQuery', true);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true } ));
app.use(cors());
connectionDB();


app.use(usersRoute);
app.use(postRoute);


app.get("/", (req, res)=>{
                            res.json(`Welcome to Blog app`);
                          }
        );



let PORT = process.env.PORT||5001;
app.listen(PORT , () =>{
                          console.log(`Blog app server is running on http://localhost:${PORT}`);
                       }
          );

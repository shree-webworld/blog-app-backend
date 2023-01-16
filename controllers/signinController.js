import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/token.js";

dotenv.config();

const postSignin = async (req, res) =>{
                                          console.log(req.body);
                                          const {email, password} = req.body;

                                          if(!email || !password)
                                          {
                                            return res.status(422).json({error: "Please add all the fields"});
                                          }

                                          try
                                          {
                                            const user_exits = await User.findOne({email});
                                            if (user_exits)
                                            {
                                                const isMatch = await bcrypt.compare(password, user_exits.password);

                                                if(!isMatch)//if(!user_exits)
                                                {
                                                  console.log("Invalid Credentials");
                                                  return res.status(404).json({error:"⚠️Invalid Credentials"});
                                                }else
                                                  {
                                                    // let token = await user_exits.generateAuthToken();
                                                    let accessToken = jwt.sign(user_exits.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '60m'});
                                                    let refreshToken = jwt.sign(user_exits.toJSON(), process.env.REFRESH_SECRET_KEY);

                                                    let newToken = new Token({ token: refreshToken });
                                                    await newToken.save();

                                                    console.log("Login successfully");
                                                    return res.status(200).json({name:user_exits.name, email:user_exits.email, accessToken, refreshToken});
                                                  }

                                            }else
                                              {
                                                console.log("Invalid Credentials");
                                                return res.status(404).json({error:"⚠️Invalid Credentials"});
                                              }


                                          } catch (e)
                                            {
                                              console.log(e);
                                              return res.status(500).json({error: "⚠️Failed to signin"});
                                            }
                                      }




const signinController = async (req, res) =>{
                                              switch (req.method)
                                              {
                                                case "POST":
                                                            await postSignin(req,res);
                                                            break;
                                              }
                                    }




export default signinController;
















/*
.find({ _id: { $eq: req.params.id } }
const usersbyid = await Users.find({ _id: { $ne: req.params.id } });

const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
*/

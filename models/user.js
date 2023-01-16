import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
                                      name:
                                      {
                                          type: String,
                                          required: true,
                                          unique: true,
                                          trim:true,
                                          min:2,
                                          max:30
                                      },
                                      email:
                                      {
                                          type: String,
                                          required: true,
                                          unique: true,
                                          trim:true
                                      },
                                      password:
                                      {
                                          type: String,
                                          required: true,
                                          trim:true
                                      },
                                      date:
                                      {
                                        type:Date,
                                        default:Date.now
                                      }

                                    },{
                                          timestamps:true
                                        }
                                );



                                userSchema.pre("save", async function (next)
                                {
                                    if (this.isModified("password"))
                                    {
                                        this.password = await bcrypt.hash(this.password, 12);
                                    }

                                    next();
                                });



const user = mongoose.model('user', userSchema);

export default user;

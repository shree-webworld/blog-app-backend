import Post from "../models/post.js";



const createPost = async (req, res) => {
                                              console.log(req.body);
                                              const {title, description, picture, username, categories, createdDate} = req.body;

                                              if(!title || !description  || !username)
                                              {
                                                  console.log("Please add all the fields");
                                                  return  res.status(422).json({error:"Please add all the fields"});
                                              }

                                              try
                                              {
                                                  const postDetails = new Post({picture, title, description, username, categories, createdDate});
                                                  await postDetails.save();

                                                  console.log("posted successfully");
                                                  return res.status(201).json(postDetails);

                                              }catch(e)
                                                {
                                                  console.log("postModel error ", e);
                                                  return res.status(500).json({error: "Failed to post"});
                                                }
                                           }


const getCreatePost = async (req, res) => {
                                        try
                                        {
                                            const postDetails = await Post.find();
                                            return res.status(200).json(postDetails);
                                        }catch(e)
                                          {
                                              console.error(e);
                                              return res.status(500).json({error : "Failed to fetch post data"});
                                          }
                                    }


const getSinglePost = async (req, res) =>{
                                try
                                {
                                  const post = await Post.findById(req.params.id);
                                  res.status(200).json(post);
                                }catch (e)
                                  {
                                    console.log(e);
                                    return res.status(500).json({error : "Failed to fetch post data"});

                                  }
                        }


  const getFilteredPost =  async (req, res) => {
                            // console.log(req);

                          const username = req.query.user;
                          const catName = req.query.category;
                          try
                          {
                            let posts;
                            if (username)
                            {
                                posts = await Post.find({ username });
                            }else if (catName)
                              {
                                posts = await Post.find({
                                                          categories: {
                                                                        $in: [catName]
                                                                      }
                                                        });
                            }else
                              {
                                posts = await Post.find();
                              }
                                res.status(200).json(posts);
                            }catch (err)
                             {
                               res.status(500).json(err);
                            }
                        };


const deletePost = async (req, res) =>{
                        try
                        {
                            const post = await Post.findById(req.params.id);
                            if (post.username === req.body.username)
                            {
                              await post.delete();
                              res.status(200).json("Post has been deleted...");
                            }else
                              {
                                res.status(401).json("You can delete only your post!");
                              }
                        }catch (e)
                          {
                              console.log(e);
                              res.status(500).json({error : "Failed to delete post data"});
                          }

                  }


const updatePost = async (req, res) =>{
                          try
                          {
                            const post = await Post.findById(req.params.id);
                            if(post.username === req.body.username)
                            {
                              const updatedPost = await Post.findByIdAndUpdate(
                                                    req.params.id,
                                                    {
                                                      $set: req.body,
                                                    },{new : true}
                              );
                              res.status(200).json(updatedPost);
                            }else
                              {
                                res.status(401).json("You can update only your post!");
                              }
                          }catch (e)
                            {
                                console.log(e);
                                res.status(401).json("Failed to update  post!");
                            }
                      }



export  {createPost, getCreatePost, getSinglePost, getFilteredPost, deletePost, updatePost};

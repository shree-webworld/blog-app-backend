

import express from "express";
import asyncHandler from "express-async-handler";
import {createPost, getCreatePost, getSinglePost, getFilteredPost, deletePost, updatePost} from "../controllers/postController.js";

const router = new express.Router();



router.post("/api/createpost", asyncHandler(createPost) );
router.get("/api/createpost", asyncHandler(getCreatePost) );


router.get("/api/post/:id", asyncHandler(getSinglePost));

router.get("/api/post", asyncHandler(getFilteredPost));

router.delete("/api/post/:id", asyncHandler(deletePost));

router.put("/api/post/:id", asyncHandler(updatePost));


export default router;

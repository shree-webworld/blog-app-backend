
import express from "express";
import asyncHandler from "express-async-handler";
import signupController from "../controllers/signupController.js";
import signinController from "../controllers/signinController.js";


const router = new express.Router();


router.get("/api/signup", asyncHandler(signupController) );
router.post("/api/signup", asyncHandler(signupController) );

router.post("/api/signin", asyncHandler(signinController) );
router.get("/api/signin", (req, res)=>
                                      {
                                        res.send(`hello world from chat app ==> signin_api`);
                                      }
          );


export default router;

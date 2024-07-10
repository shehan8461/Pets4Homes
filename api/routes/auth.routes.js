import express from 'express'
import { signin, signup,google,signout,store,getOrdersByCustomerId,allitems,google1 } from '../controllers/auth.controller.js';


const router=express.Router();

router.post("/signup",signup)//register
router.post("/signin",signin)//login
router.post("/google",google)
router.post("/google1",google1)
router.get('/signout',signout)


router.post("/store",store)
router.get("/user/:id",getOrdersByCustomerId)//for data fetch user id
router.get("/users/items",allitems)
export default router
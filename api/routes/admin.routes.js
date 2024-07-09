import express from 'express'
import { admin_signup, admin_signin,admin_details,updateAdmin,deleteAdmin,fetchupdateAdmin } from '../controllers/admin.controller.js';


const router=express.Router();
router.get("/admin_details",admin_details)

router.post("/admin_signup",admin_signup)//register
router.post("/admin_signin",admin_signin)//login

router.put("/update_admin",updateAdmin)
router.delete("/delete_admin/:id",deleteAdmin)
router.get("/update_admin/:id",fetchupdateAdmin)

export default router;

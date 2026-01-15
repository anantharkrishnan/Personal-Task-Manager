const express= require("express")




const userRouter= express.Router()
const {signUp,login,logout}= require("../controllers/userController")

userRouter.post("/signup",signUp)
userRouter.post("/login",login)
userRouter.get("/logout",logout)



module.exports=userRouter
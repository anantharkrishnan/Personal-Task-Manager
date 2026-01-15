const mongoose=require("mongoose")

const userschema=new mongoose.Schema({

    name:{
       type:String,
       required:[true,"name is required"],
       trim:true
    },
    email:{
       type:String,
       required:[true,"email is required"],
       trim:true 
    },
    password:{
       type:String,
       required:[true,"password is required"],
       

}
},{timestamps:true})


module.exports=mongoose.model("user",userschema)
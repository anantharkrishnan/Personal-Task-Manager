const user=require("../models/userModel")
const bcrypt=require("bcryptjs")
const createToken=require("../utils/generateToken")



const signUp=async(req,res)=>{

   try {
     const{name,email,password}=req.body||{}
    
     
     
     if (!name || !email || !password ) {
       return res.status(400).json({ message: "Name, email, and password are required." });
     }
     

    const userExists=await user.findOne({email})
    if(userExists){
       return res.status(400).json({message:"user already exist"})

    }
    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    

    const newUser=new user({name,email,password:hashedPassword})
    const savedUser=await newUser.save()
     
    
     
     return res.status(201).json({message:"user created successfully",savedUser})
    
   } catch (error) {
    console.log(error);
    return res.status(error.status||500).json({error:error.message||"internal server error"})
    
   }

}

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const userExists = await user.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userExists.password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password" });
    }

  
    const userObject = userExists.toObject();
    delete userObject.password;

   
    const token = createToken(
      userExists._id,
      userExists.role
    );

  
    res.cookie("token", token, {
      httpOnly: true,
     secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

   
    return res.status(200).json({
      success: true,
      token,
      userObject
    });

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error" });
  }
};
const logout= async(req,res)=>{
  try{
  res.clearCookie("token")
  res.json({message:'logout successfully'})
} catch(error){
   console.log(error);
     return res.status(error.status||500).json({error:error.message||"internal server error"})
}
}

module.exports={signUp,login,logout}
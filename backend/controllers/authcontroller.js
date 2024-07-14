const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const Register = async(req, res) => {
    try{
        const {email, username, password} = req.body;
        const hashpassword = bcrypt.hashSync(password)
        const user = new User({
            email, username, password: hashpassword
        })
        await user.save()
        res.status(200).json({
            
            token: await user.generateToken(),
            userId: user._id.toString(),
            message:"Sign Up successfull"

        })
    }catch(error){
        res.status(200).json({
            message: "User Already Exists"
        })
    }
}

const Login =  async(req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        })
        if(!user){
            res.status(200).json({
                message: "Please sign up first"
            })
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isPasswordCorrect){
            res.status(200).json({
                message: "Password is not correct"
            })
        }
        const {password, ...others} = user._doc;//password bade bakisob show korbe
        res.status(200).json({
            others,
            msg: "Login Successful",
            token: await user.generateToken(),
            userId: user._id.toString()
        })
    }catch(error){
        res.status(200).json({
            message: "User Already Exists"
        })
    }
}

module.exports = {Register, Login}
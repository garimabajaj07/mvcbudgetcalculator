import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    aadharNo:{
        type:String,
        required:true,
        unique:true
    },
    shopName: {
        type: String,
        required: true
    }

})

const SellerModel= mongoose.model("seller", sellerSchema )

export default SellerModel
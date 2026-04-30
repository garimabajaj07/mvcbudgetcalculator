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
        type: String, required: true, trim: true, validate: {
            validator: v => /^[1-9][0-9]{9}$/.test(v),
            message: "Phone number must be 10 digits and cannot start with 0"

        }
    },
    password: {
        type: String,
        required: true
    },
    aadharNo: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: v => /^\d{12}$/.test(v),
            message: "Aadhar must be exactly 12 digits"
        }
    },
    shopName: {
        type: String,
        required: true
    }

})

const SellerModel = mongoose.model("seller", sellerSchema)

export default SellerModel
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true,  minlength:[6, "Name must be at least 6 characters"] },
    name: { type: String, required: true, minlength:[6, "Name must be at least 6 characters"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: [8, "Password must be at least 8 characters"] },
    dob: { type: String, required: true },
    phoneNo: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] }

})

const UserModel = mongoose.model("user", userSchema)

export default UserModel
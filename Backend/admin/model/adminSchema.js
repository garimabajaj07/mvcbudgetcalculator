import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true,  minlength:[6, "Name must be at least 6 characters"] },
    password: { type: String, required: true, minlength: [8, "Password must be at least 8 characters"] },
    
})

const AdminModel = mongoose.model("admin", adminSchema)

export default AdminModel
import express from "express"
import connectDB from "./database/connectDB.js"
import cors from "cors"
import UserRouting from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import productRouter from "./routes/productRoute.js"
import cartRoutes from "./routes/cartRoutes.js"
import adminRoutes from "./admin/router/adminrouter.js"
import "dotenv/config"
// import bcrypt from "bcrypt"
// const hashedpassword = await bcrypt.hash("12345678", 10)
// console.log(hashedpassword);


const app = express()
const Port = process.env.PORT
const corsOptions = {
    origin: process.env.FRONTEND_URL,//frontend url
    credentials: true     // required for cookies
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

// serve images
app.use("/uploads", express.static("uploads"))

await connectDB()

//API
app.use("/product", productRouter)
app.use("/user", UserRouting)
app.use("/cart", cartRoutes)
app.use("/admin", adminRoutes)

app.listen(Port, () => console.log("Server started at", Port))

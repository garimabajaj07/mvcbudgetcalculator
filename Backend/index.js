import express from "express"
import connectDB from "./database/connectDB.js"
import cors from "cors"
import UserRouting from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import productRouter from "./routes/productRoute.js"
import cartRoutes from "./routes/cartRoutes.js"


const app = express()
const Port= 3000

const corsOptions={
    origin:"http://localhost:5173", //frontend url
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

app.listen(Port, ()=> console.log("Server started at", Port))

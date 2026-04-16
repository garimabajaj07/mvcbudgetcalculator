import AdminModel from "../model/adminSchema.js"
import UserModel from "../../model/schema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import Product from "../../model/productSchema.js"

export async function adminLogin(req, res) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password required" })
        }
        const usernameExists = await AdminModel.findOne({ username })
        if (!usernameExists) {
            return res.status(401).json({ message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(password, usernameExists.password)
        console.log(matchPassword);
        
        if (!matchPassword) {
            return res.status(401).json({ message: "Invalid password" })
        }
         // CLEAR USER TOKEN FIRST (IMPORTANT)
        res.clearCookie("token")
        //TOKEN
        const adminToken = jwt.sign(
            { id: usernameExists._id, username: usernameExists.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        //SEND TOKEN TO FRONTEND
        res.cookie("tokenadmin", adminToken, {
            httpOnly: true,
            secure: true,
            sameSite:  process.env.SAME_SITE,
            maxAge: 60 * 60 * 1000
        })
        res.json({ message: "Login successful" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
export async function deleteMultipleProducts(req, res) {
  try {
    const { ids } = req.body

    await Product.deleteMany({
      _id: { $in: ids }
    })

    res.json({ message: "Products deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export async function fetchRecords(req, res) {
    try {
        const allUsers = await UserModel.find()
        res.json(allUsers)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}
export async function deleteUser(req, res) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "id not provided" })
        }

        const userToDelete = await UserModel.findById(id)
        if (!userToDelete) {
            return res.status(400).json({ message: "id not found" })
        }

        await UserModel.findByIdAndDelete(id)
        res.json({ message: "deleted" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export async function editUser(req, res) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "id not provided" })
        }

        const userToUpdate = await UserModel.findById(id)
        if (!userToUpdate) {
            return res.status(400).json({ message: "user not found" })
        }

        const body = req.body
        await UserModel.findByIdAndUpdate(id, body, { new: true })
        res.json({ message: "updated" })


    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}
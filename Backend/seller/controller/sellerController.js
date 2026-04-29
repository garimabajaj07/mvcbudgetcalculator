import SellerModel from "../model/sellerSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Product from "../../model/productSchema.js";

export async function submitSeller(req, res) {
    try {
        const { name, email, phoneNo, username, password, aadharNo, shopName } = req.body
        //  Required fields
        if (!name || !email || !phoneNo || !shopName || !username || !password || !aadharNo) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (name.length < 6) {
            return res.status(400).json({ message: "Name must be at least 6 characters" })
        }

        if (username.length < 6) {
            return res.status(400).json({ message: "Username must be at least 6 characters" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        if (aadharNo.length !== 12) {
            return res.status(400).json({ message: "Aadhar No. must be at least 12 characters" })
        }

        // check existing email
        const existingEmail = await SellerModel.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const existingUsername = await SellerModel.findOne({ username })
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" })
        }


        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10)

        const form = new SellerModel(
            {
                name,
                email,
                phoneNo,
                shopName,
                username,
                aadharNo,
                password: hashedPassword,
            })
        await form.save()
        res.status(200).json({ message: "Seller registered successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }

}

export async function loginSeller(req, res) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password required" })
        }
        const usernameExists = await SellerModel.findOne({ username })
        if (!usernameExists) {
            return res.status(401).json({ message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(password, usernameExists.password)
        if (!matchPassword) {
            return res.status(401).json({ message: "Invalid password" })
        }
        //TOKEN
        const Token = jwt.sign(
            { id: usernameExists._id, username: usernameExists.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        //SEND TOKEN TO FRONTEND
        res.cookie("sellertoken", Token, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.SAME_SITE,
            maxAge: 60 * 60 * 1000
        })
        res.json({ message: "Login successful" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
export async function sellerAddProduct(req, res) {
    try {
        const { name, description, variants } = req.body

        // parse variants
        let parsedVariants = JSON.parse(variants)

        const files = req.files || []

        // attach images to correct variant
        parsedVariants = parsedVariants.filter(v => v.color && v.size && v.price) // remove empty variants
            .map((variant, index) => {

                const variantImages = files
                    .filter(file => file.fieldname === `images_${index}`)
                    .map(file => file.filename)

                return {
                    color: variant.color,
                    size: variant.size,
                    price: Number(variant.price),
                    images: variantImages
                }
            })

        // safety check
        if (parsedVariants.length === 0) {
            return res.status(400).json({
                message: "At least one valid variant is required"
            })
        }

        const product = new Product({
            name,
            description,
            variants: parsedVariants,
            sellerId: req.user.id
        })

        await product.save()

        res.json({ message: "Product added successfully", product })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export async function myProducts(req, res) {
    try {
        const sellerId = req.user.id
        const products = await Product.find({ sellerId })
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
export async function deleteProducts(req, res) {
    try {

        const { ids } = req.body
        const sellerId = req.user.id

        if (!ids) {
            return res.status(400).json({ message: "Product Id is required" })
        }


        await Product.deleteMany({
            _id: { $in: ids },
            sellerId: sellerId
        })
        res.json({ message: "Product deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

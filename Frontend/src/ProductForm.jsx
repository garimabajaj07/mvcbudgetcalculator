import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function ProductForm() {

    const navigate=useNavigate()

    const [data, setData] = useState({
        name: "",
        description: "",
        price: ""
    })

    const [images, setImages] = useState([])

    function handleChange(e) {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    function handleImageChange(e) {
        setImages(e.target.files)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i])
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/product/addproduct",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )

            alert(res.data.message)

            setData({
                name: "",
                description: "",
                price: ""
            })

            navigate("/showproducts")
            

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                />

                <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                />

                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}
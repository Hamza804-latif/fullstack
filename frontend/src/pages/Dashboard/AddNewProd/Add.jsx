import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import Avatar from "../../../assets/productAvatar.jpeg";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  async function Add() {
    if (image && name && price && stock) {
      try {
        let res = await fetch("http://localhost:5000/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image, name, price, stock }),
        });
        let jsonData = await res.json();
        if (jsonData?.status === 200) {
          toast.success(jsonData?.msg);
          navigate("/home");
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("please fill all fields");
    }
  }
  function ConvertImage(event) {
    if (event.target.files.length > 0) {
      const filereader = new FileReader();
      filereader.readAsDataURL(event.target.files[0]);
      filereader.onload = () => {
        setImage(filereader.result);
      };
    }
  }
  return (
    <div className="AddMain">
      <div className="loginForm">
        <h1>Add Product</h1>

        <label htmlFor="productimg" className="label">
          <img src={image ? image : Avatar} alt="profile" />
          <input
            type="file"
            id="productimg"
            onChange={(e) => ConvertImage(e)}
            style={{ display: "none" }}
          />
        </label>

        <input
          type="text"
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product stock"
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={Add}>Add</button>
      </div>
    </div>
  );
};

export default Add;

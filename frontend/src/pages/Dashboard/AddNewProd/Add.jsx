import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./add.css";
import Avatar from "../../../assets/productAvatar.jpeg";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      GetSingleData();
    }
  }, []);

  async function GetSingleData() {
    let res = await fetch(`http://localhost:5000/singleproduct/${id}`);
    let jsonData = await res.json();
    if (jsonData?.status === 200) {
      let { image, name, price, stock } = jsonData?.data;
      setImage(image);
      setName(name);
      setPrice(price);
      setStock(stock);
    }
  }

  async function Add() {
    if (image && name && price && stock) {
      let method = id ? "PUT" : "POST";
      let route = id ? `editdata/${id}` : "addproduct";
      try {
        let res = await fetch(`http://localhost:5000/${route}`, {
          method: method,
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
        <h1>{id ? "Edit" : "Add"} Product</h1>

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={Add}>{id ? "Update" : "Add"}</button>
      </div>
    </div>
  );
};

export default Add;

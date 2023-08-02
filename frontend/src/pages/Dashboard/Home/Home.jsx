import React, { useEffect, useState } from "react";
import "./home.css";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const naviagte = useNavigate();

  useEffect(() => {
    GetAll();
  }, []);

  async function GetAll() {
    try {
      let res = await fetch("http://localhost:5000/allproducts");
      let jsonData = await res.json();
      if (jsonData?.status === 200) {
        setData(jsonData?.data);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  async function Delete(id) {
    try {
      let res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });
      let jsonData = await res.json();
      if (jsonData?.status === 200) {
        toast.success(jsonData?.msg);
        GetAll();
      } else {
        toast.error(jsonData?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function Edit(id) {
    naviagte(`/editproduct/${id}`);
  }
  return (
    <div className="table">
      <table border="1px">
        <tr>
          <th>product image</th>
          <th>product name</th>
          <th>price</th>
          <th>stock</th>
          <th>actions</th>
        </tr>
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <tr key={item?._id}>
                <td>
                  <img src={item?.image} alt="" />
                </td>
                <td>{item?.name}</td>
                <td>{item?.price}</td>
                <td>{item?.stock}</td>
                <td>
                  <button onClick={() => Edit(item?._id)}>Edit</button>
                  <button onClick={() => Delete(item?._id)}>Delete</button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>No data Found</tr>
        )}
      </table>
    </div>
  );
};

export default Home;

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
    let token = JSON.parse(localStorage.getItem("userToken"));
    try {
      let res = await fetch("http://localhost:5000/allproducts", {
        headers: {
          auth: token ? `bearer ${token}` : null,
        },
      });
      let jsonData = await res.json();
      if (jsonData?.status === 200) {
        setData(jsonData?.data);
      } else {
        toast.error(jsonData.msg);
      }
      if (jsonData?.status !== 200 && jsonData?.login === false) {
        localStorage.removeItem("userToken");
        naviagte("/login");
        return;
      }
    } catch (error) {
      toast.error(error);
    }
  }
  async function Delete(id) {
    let token = JSON.parse(localStorage.getItem("userToken"));
    try {
      let res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
        headers: {
          auth: token ? `bearer ${token}` : null,
        },
      });
      let jsonData = await res.json();
      if (jsonData?.status === 200) {
        toast.success(jsonData?.msg);
        GetAll();
      } else {
        toast.error(jsonData?.msg);
      }
      if (jsonData?.status !== 200 && jsonData?.login === false) {
        localStorage.removeItem("userToken");
        naviagte("/login");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function Edit(id) {
    naviagte(`/editproduct/${id}`);
  }

  async function Search(e) {
    let token = JSON.parse(localStorage.getItem("userToken"));
    if (e) {
      let res = await fetch(`http://localhost:5000/search/${e}`, {
        headers: {
          auth: token ? `bearer ${token}` : null,
        },
      });
      let jsonData = await res.json();
      if (jsonData?.status === 200) {
        setData(jsonData?.data);
      } else {
        toast.error(jsonData?.msg);
      }
      if (jsonData?.status !== 200 && jsonData?.login === false) {
        localStorage.removeItem("userToken");
        naviagte("/login");
        return;
      }
    } else {
      GetAll();
    }
  }
  return (
    <>
      <div className="table">
        <input
          type="text"
          placeholder="Search Product..."
          onChange={(e) => Search(e.target.value)}
        />
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
    </>
  );
};

export default Home;

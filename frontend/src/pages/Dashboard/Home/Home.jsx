import React, { useEffect, useState } from "react";
import "./home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

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
              <tr>
                <td>
                  <img src={item?.image} alt="" />
                </td>
                <td>{item?.name}</td>
                <td>{item?.price}</td>
                <td>{item?.stock}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
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

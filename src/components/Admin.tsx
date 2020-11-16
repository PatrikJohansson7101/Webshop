import React, { useEffect, useState } from "react";
import axios from "axios";

interface IMovie {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
}

const defaultValue: IMovie[] = [];

export default function Admin() {
  const [data, setData] = useState(defaultValue);

  useEffect(() => {
    async function getData() {
      const result = await axios.get(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=1883"
      );
      setData(result.data);
      console.log("AdminPage:", result.data);
    }
    getData();
  }, []);

  async function deleteOrder(orderId) {
    try {
      const result = await axios.delete(
        `https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${orderId}`
      );
      console.log("AdminPage: Deleted", result.data);
    } catch (err) {
      console.log(err);
    }
    async function getData() {
      const result = await axios.get(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=1883"
      );
      setData(result.data);
      console.log("AdminPage:", result.data);
    }
    getData();
  }

  return (
    <div className="orderContainer">
      <h2>Orders</h2>
      {data.length ? (
        data.map((item: any) => (
          <div className="oneOrder" key={item.id}>
            <div>
              <span>OrderId:</span>:{item.id}
            </div>
            <div>
              <span>Created</span>:{item.created}
            </div>
            <div>
              <span>Created by:</span>
              {item.createdBy}
            </div>
            <div>
              <span>Payment method:</span>
              {item.paymentMethod}
            </div>
            <div>
              <span>Product Quantity:</span>
              {item.orderRows.length}
            </div>
            <button onClick={() => deleteOrder(item.id)}>Delete</button>
          </div>
        ))
      ) : (
        <div>No orders available</div>
      )}
    </div>
  );
}

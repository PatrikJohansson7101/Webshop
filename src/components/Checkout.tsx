import React, { ChangeEvent, useState } from "react";
import axios from "axios";

interface IOrderObject {
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: Array<any>;
}

interface IMovie {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
}

export default function Checkout(props: any) {
  const [createdBy, setCreatedBy] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const order = props.items;
  const date = new Date();

  const orderObject: IOrderObject = {
    companyId: 1883,
    created: date.toISOString(),
    createdBy,
    paymentMethod,
    totalPrice: 0,
    status: 0,
    orderRows: [],
  };

  function addProductToOrder(item: IMovie) {
    orderObject.orderRows.push({
      productId: item.id,
      product: null,
      amount: 1,
    });
  }

  async function sendOrder() {
    try {
      axios.post(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/orders",
        orderObject
      );
    } catch (e) {
      console.log(e);
    }
  }

  order.forEach((x: IMovie) => {
    addProductToOrder(x);
  });

  function updateCreatedBy(e: ChangeEvent<HTMLInputElement>) {
    setCreatedBy(e.target.value);
  }

  function updatePaymentMethod(e: ChangeEvent<HTMLInputElement>) {
    setPaymentMethod(e.target.value);
  }

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      sendOrder();
      props.clearCart();
      window.location.href = "/admin";
    } catch (e) {
      console.log("Error confirmed", e);
    }
  };

  return (
    <div>
      <h4>Checka ut</h4>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="createdby">Created by:</label>
          <input
            value={createdBy}
            onChange={updateCreatedBy}
            id="createdby"
            type="text"
          />

          <label htmlFor="payment">Payment Method</label>
          <input
            id="payment"
            type="text"
            value={paymentMethod}
            onChange={updatePaymentMethod}
          />

          <button type="submit">Send order</button>
        </form>
      </div>
    </div>
  );
}

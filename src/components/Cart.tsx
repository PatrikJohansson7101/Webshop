import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart(props: any) {
  const [totalPrice, setTotalPrice] = useState(0);
  let order = props.items;

  useEffect(() => {
    function getToalSum() {
      let scopedPrice = 0;
      const prices = order.map((item) => item.price);
      prices.forEach((x) => {
        scopedPrice += x;
      });
      setTotalPrice(scopedPrice);
    }
    getToalSum();
  });

  function deleteItem(item) {
    props.handleDelete(item);
  }

  return (
    <div className="orderContainer">
      <h4>Kundvagn</h4>
      <div className="cartContainer">
        {order.length ? (
          order.map((item: any) => (
            <div className="productCard" key={item.id}>
              <div>
                <div>Title: {item.name}</div>
                <img src={item.imageUrl} alt="Kimmy" />
                <div className="line">Price: {item.price}$</div>
                <div className="line">Year: {item.year}</div>
                <button type="button" onClick={() => deleteItem(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>

      <p>Total sum: ${totalPrice}</p>
      <Link to="/Checkout">
        <span>Checkout</span>
      </Link>
    </div>
  );
}

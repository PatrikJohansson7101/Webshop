import React, { useState, useEffect } from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import axios from "axios";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Admin from "./components/Admin";

interface IMovie {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
}

const defaultValue: IMovie[] = [];

function App() {
  const [cart, setCart] = useState(defaultValue);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await axios.get(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/products"
      );
      setOriginalData(result.data);
      setData(result.data);
    }
    getData();

    async function filterCategoryData() {
      const result = await axios.get(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/categories"
      );
      setCategoryData(result.data);
    }
    filterCategoryData();
  }, []);

  async function getAllMovies() {
    const result = await axios.get(
      "https://medieinstitutet-wie-products.azurewebsites.net/api/products"
    );
    setData(result.data);
  }

  function filterCategoryArray(categoryId) {
    const filtered = originalData.filter((item) => {
      return item.productCategory[0].categoryId === categoryId;
    });
    setData(filtered);
  }

  function handleAddItems(movie: IMovie) {
    setCart([...cart, movie]);
  }

  function handleDeleteItems(item) {
    let idToRemove = item.id;
    setCart(cart.filter((item) => item.id !== idToRemove));
  }

  function clearCheckout() {
    setCart(defaultValue);
  }
  async function searchMovie(query) {
    const result = await axios.get(
      `http://medieinstitutet-wie-products.azurewebsites.net//api/search?searchText=${query}`
    );

    setData(result.data);
  }

  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Shop">
            <Shop
              search={searchMovie}
              categoryData={categoryData}
              data={data}
              updateShoppingCart={handleAddItems}
              filterCategoryArray={filterCategoryArray}
              getAllMovies={getAllMovies}
            ></Shop>
          </Route>
          <Route path="/Cart">
            <Cart items={cart} handleDelete={handleDeleteItems} />
          </Route>
          <Route path="/Checkout">
            <Checkout clearCart={clearCheckout} items={cart} />
          </Route>
          <Route>
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

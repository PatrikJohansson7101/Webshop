import React, { useEffect, useState } from "react";

import Categories from "./categories/Categorys";
import TextClamp from "react-string-clamp";
import Search from "./Search";

interface IMovie {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    year: number;
}

export default function Shop(props: any) {
    //props.data = Alla produkter från API
    //categoryData = Alla kategorier från API
    const data = props.data;
    const categoryData = props.categoryData;

    function filterCategoryArray(categoryId) {
        props.filterCategoryArray(categoryId);
    }

    function getAllMovies(categoryId) {
        props.getAllMovies(categoryId);
    }

    function addToCart(movie: IMovie) {
        props.updateShoppingCart(movie);
    }

    function searchMovie(query: string) {
        props.search(query);
    }

    return (
        <div className="ShopContainer">
            <div className="catContainer">
                <Categories
                    categoryData={categoryData}
                    filterCategoryArray={filterCategoryArray}
                    getAllMovies={getAllMovies}
                />
            </div>
            <Search search={searchMovie} />
            <div className="cardContainer">
                {data.length ? (
                    data.map((item: any) => (
                        <div className="productCard" key={item.id}>
                            <div>
                                <div>{item.name}</div>
                                <img src={item.imageUrl} alt="" />

                                <div className="line">
                                    <TextClamp
                                        lines={4}
                                        text={item.description}
                                    />
                                </div>
                                <div className="line">Price: ${item.price}</div>
                                <div className="line">Year: {item.year}</div>
                                <div>
                                    <button
                                        className="buttonAbsolute"
                                        type="button"
                                        onClick={() => addToCart(item)}
                                    >
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </div>
    );
}

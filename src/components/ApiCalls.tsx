import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ApiCall() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            const result = await axios.get(
                "https://medieinstitutet-wie-products.azurewebsites.net/api/products"
            );
            setData(result.data);
            console.log("GetData:", result.data);
        }
        getData();
        console.log("useEffect + getdata körs här:");
    }, []);

    return (
        <React.Fragment>
            {data.length ? (
                data.map((item: any) => (
                    
                    
                        <div className="productCard">
                        <div key={item.id}>
                            <div>Title: {item.name}</div>
                            <img src={item.imageUrl} alt="" />
                            {/* <div>description: {item.description}</div> */}
                            {/* <div>Price: {item.price}</div>
                            <div>Year: {item.year}</div> */}
                            <div><button type="button">Buy</button></div>
                        </div>
                    </div>
                        
                    
                ))
            ) : (
                <div>Loading</div>
            )}
        </React.Fragment>
    );
}

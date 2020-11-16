import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div className="navigation">
            <ul className="nav-links">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/Shop">
                    <li>Shop</li>
                </Link>
                <Link to="/Cart">
                    <li>Cart</li>
                </Link>
                <Link to="/Admin">
                    <li>Admin</li>
                </Link>
            </ul>
        </div>
    );
}

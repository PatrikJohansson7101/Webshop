import React from "react";

export default function Home() {
    return (
        <div className="Home">
            <h4>Välkommen till webshoppen</h4>
            <p>
                Klicka på{" "}
                <a href="http://localhost:3000/Shop" className="bold">
                    Shop
                </a>{" "}
                för att komma vidare..
            </p>
        </div>
    );
}

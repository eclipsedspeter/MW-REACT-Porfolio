import React from "react";
import { Link } from "react-router-dom";

export default function () {
    return (
        <div className="nomatchpage-container">
            <h2>We could not find your page</h2>
            <Link to="/">Homepage</Link>
        </div>
    )
}
import React from "react";
import { Link } from "react-router-dom";

export default function () {
    return (
        <div>
            <h2>We could not find your page</h2>
            <Link to="/pages/home">Homepage</Link>
        </div>
    )
}
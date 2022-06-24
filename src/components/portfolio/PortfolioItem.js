import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
    return (
        <div> 
            <h3>Portfolio Item {props.title}</h3>
            <Link to={`/portfolio/${props.slug}`}>Link</Link>
        </div>
    )
}
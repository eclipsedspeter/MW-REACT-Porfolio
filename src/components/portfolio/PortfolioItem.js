import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
    return (
        <div> 
            <h3>Portfolio Item {props.title}</h3>
            <Link to={`/portfolio/${props.slug}`}>Link</Link>
            {console.log("banner image",props.banner_image_url)}
            {props.banner_image_url !== null ? <img src={props.banner_image_url}></img> : ""}
        </div>
    )
}
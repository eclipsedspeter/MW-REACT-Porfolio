import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
    return (
        <div className="items-wrapper"> 
            <div className="item-image-container">
                    {props.banner_image_url !== null ? <img src={props.banner_image_url}></img> : ""}
                </div>
            <div className="content">
                <div className="item-heading-container">
                    <h3>{props.title}</h3>
                </div>
                <div className="item-description-container">
                    <p>{props.description}</p>
                </div>
                <div className="item-link-container">
                    <Link to={`/portfolio/${props.slug}`}>Read more</Link>
                </div>
            </div>
           
        </div>
    )
}
import React from "react";
import { useHistory } from "react-router-dom";


export default function(props) {
    const { id, description, thumb_image_url, logo_url} = props.el;

    const history = useHistory();

    function handleClick(){
        history.push(`portfolio/${id}`)
    }
    
    return (
        <button className="items-wrapper" type="button" onClick={handleClick}> 
            <div className="item-image-container">
                    {thumb_image_url !== null ? <img src={thumb_image_url}></img> : ""}
                </div>
            <div className="content">
                <div className="item-logo-container">
                    <img src={logo_url}></img>
                </div>
                <div className="item-description-container">
                    <p>{description}</p>
                </div>
            </div>
           
        </button>
    )
}
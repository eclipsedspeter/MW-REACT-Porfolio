import React from "react";
import PortfolioContainer from "../portfolio/PortfolioContainer";


export default function (props) {
    return (
        <div className="homepage-container">
            <PortfolioContainer data={props.data} changeable_data={props.changeable_data} />
        </div>

    )
}
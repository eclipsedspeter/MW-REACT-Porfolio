import React from "react";

export default function (props) {
    return (
        <div>
            <h2>PortfolioDetail for {props.match.params.slug}</h2>
        </div>
    );
}

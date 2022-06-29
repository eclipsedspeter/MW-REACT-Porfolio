import React from "react";

export default function (props) {
    return (
        <div>
            <h2>PortfolioDetail for {props.data}</h2>
            {console.log(props.data)}
        </div>
    );
}

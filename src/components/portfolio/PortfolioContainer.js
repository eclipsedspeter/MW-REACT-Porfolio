import React, { Component } from "react";
import PortfolioItem from "./PortfolioItem";

export default class PortfolioContainer extends Component {
    // class based performs operations and "REACTS"
    constructor () {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            data: [
                {title: "Quip"},
                {title: "Event"},
                {title: "Safe"},
                {title: "Swingaway"}
            ]
        }
    }

    portfolioItems() {

        return this.state.data.map(el => {
            // required by react framwork... still doesn't work properly
            <li key={el.title}>
                {el.title}
            </li>

            return <PortfolioItem title = {el.title} />;
        });
    }
    render () {
        return (
            <div>
                <h2>Portfolio items go here...</h2>
                {this.portfolioItems()}
            </div>
        )
    }
}
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PortfolioManager extends Component {
    render (){
        return (
            <div className="portfolioManagerpage-container">
                <form>
                    <div className="left-column-wrapper">
                        <input type="text" id="item-name" name="item-name" placeholder="Portfolio Item Name"></input>
                        <input type="number" id="item-position" name="item-position" placeholder="Portfolio position"></input>
                    </div>

                    <div className="right-column-wrapper">
                        <input type="url" id="item-url" name="item-url" placeholder="Portfolio URL"></input>
                        <div className="dropdown-wrapper">
                            <button className="category-dropdown-btn">Category</button>
                            <div className="category-dropdown-content">
                                <h1>category1</h1>
                                <h1>category2</h1>
                                <h1>category3</h1>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
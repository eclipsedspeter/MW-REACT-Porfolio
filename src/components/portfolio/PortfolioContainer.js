import React, { Component } from "react";

import PortfolioItem from "./PortfolioItem";

export default class PortfolioContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            pageTitle: "",
            data: props.data,
            changeable_data: props.changeable_data, // this is the data the page shows and the data the buttons filter
            isLoading: false
        };

        this.handleFilter = this.handleFilter.bind(this);
    }


    // Pre: an array of portfolio items in this.state.data
    // Post: creates a PortfolioItem with desired attributes for each element of input.array
    portfolioItems() {
        return this.props.changeable_data.map(el => {
            return ( <div className="portfolio-item"> <PortfolioItem key={el.id} el = {el} /> </div>
        )});
    }

    // Pre: takes in a filter argument
    // Post: removes all PortfolioItems that are not === filter
    handleFilter (filter) {
        if (filter === 'RESET') {
            this.setState({
                changeable_data: this.state.data.map(item => {
                    return item;
                })
            })
            console.log("state is set", this.state.changeable_data);
        } else {
            this.setState({
                changeable_data: this.state.changeable_data.filter(el => {
                    return el.category === filter;
                })
            })
        }
    }


   
    render () {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }
        console.log("PC changeable this", this.state.changeable_data)
        console.log("PC changeable props", this.props.changeable_data)

        return (
            <div className="portfolio-container">
                 <div className="portfolio-button-container">
                    <button className = "btn" onClick={() => this.handleFilter('Technology')}>Technology</button>
                    <button className = "btn" onClick={() => this.handleFilter('Education')}>Education</button>
                    <button className = "btn" onClick={() => this.handleFilter('Business')}>Business</button>
                    <button className = "btn" onClick={() => this.handleFilter('RESET')}>Show All</button>

                </div>

                <div className="portfolio-item-container">
                    {this.portfolioItems()}
                </div>
               
            </div>
        )
    }
}
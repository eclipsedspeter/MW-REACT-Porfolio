import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./PortfolioItem";

export default class PortfolioContainer extends Component {
    constructor () {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            data: [],
            isLoading: false
        };

        this.handleFilter = this.handleFilter.bind(this);
    }

    // Pre: none
    // Post: Retrieves portfolio items from the API... look at devcamp.space for data
    // password for devcamp.space: CodingIsFun123!
    getPortfolioItems () {
        axios.get("https://maxwhipple.devcamp.space/portfolio/portfolio_items")
        
        .then(response => {
            console.log(response)
            this.setState({
                data: response.data.portfolio_items
            })
        })

        .catch(error => {
            console.log(error)
        })
    };

    // Pre: an array of portfolio items in this.state.data
    // Post: creates a PortfolioItem with desired attributes for each element of input.array
    portfolioItems() {
        return this.state.data.map(el => {
            return <PortfolioItem key={el.id} title = {el.name} url = {el.url} slug={el.id} banner_image_url = {el.banner_image_url} />;
        });
    }

    // Pre: takes in a filter argument
    // Post: removes all PortfolioItems that are not === filter
    handleFilter (filter) {
        this.setState({
            data: this.state.data.filter(el => {
                return el.category === filter;
            })
        })
    }

    // allows access to getPortfolioItems
    componentDidMount() {

        this.getPortfolioItems();

    }

   
    render () {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className="portfolio-item-container">
                <h2>{this.state.pageTitle}</h2>
                {this.portfolioItems()}
                <button onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button onClick={() => this.handleFilter('Sales')}>Sales</button>
                <button onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>

            </div>
        )
    }
}
import React, { Component } from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import Form from "../portfolio/portfolio-forms/form";

export default class PortfolioManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioItems: []
        }

        this.getItems = this.getItems.bind(this);
        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this)
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    // Pre: takes in the portfolioItem to be deleted
    // Post: updates the API
    handleDeleteClick(portfolioItem) {
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true })
        .then(response => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(el => {
                    return el.id !== portfolioItem.id;
                })
            })

            return response.data

        }).catch(error => {
            console.log(error)
        })
    }

    // adds the portfolioItem at the top of the sidebar
    handleSuccessfulFormSubmission (portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems) // adds new item at the beginning of the sidebar list
        })
    }

    handleFormSubmissionError(error) {
        console.log(error)
    }
        
    // gets portfolioItems from the API
    getItems () {
        axios.get("https://maxwhipple.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",    
        {withCredentials: true})
        
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
    });
}

    componentDidMount() {
        this.getItems();
    }; 

    render (){
        return (
            <div className="portfolioManagerpage-container">
                <Form 
                    handleFormSubmissionError = {this.handleFormSubmissionError}
                    handleSuccessfulFormSubmission = {this.handleSuccessfulFormSubmission} 
                    portfolioItems = {this.state.portfolioItems}
                    />

                <div className="side-bar">
                    <PortfolioSidebarList 
                    data={this.state.portfolioItems}
                    handleDeleteClick = {this.handleDeleteClick}
                    />
                </div>
            </div>
        )
    }
}
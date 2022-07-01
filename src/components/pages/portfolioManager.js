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
    }

    handleSuccessfulFormSubmission (portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
    }

    handleFormSubmissionError(error) {
        console.log(error)
    }
        
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
                    <PortfolioSidebarList data={this.state.portfolioItems}/>
                </div>
            </div>
        )
    }
}
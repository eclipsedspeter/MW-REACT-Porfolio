import React, { Component } from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import Form from "../portfolio/portfolio-forms/form";

export default class PortfolioManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }

        this.getItems = this.getItems.bind(this);
        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this)
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    // runs after the form.js state has been updated
    // this is to prevent an infinite loop
    clearPortfolioToEdit () {
        this.setState({
            portfolioToEdit: {}
        })
    }

    // handles when the edit button is pressed
    handleEditClick (portfolioItem) {
        this.setState ({
            portfolioToEdit: portfolioItem
        });
    }

    // Pre: takes in the portfolioItem to be deleted
    // Post: deletes the portfolioItem from the API
    // Uses: axios
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

    // Pre: takes in portfolioItem to be added and editMode(boolean)
    // Post: adds the new portfolioItem at the top of the sidebar depending on editMode
    handleSuccessfulFormSubmission (portfolioItem, editMode) {

        // prevents creating a new portfolio item when editing existing item
        if(!editMode){
            this.setState({
                portfolioItems: [portfolioItem].concat(this.state.portfolioItems) // adds new item at the beginning of the sidebar list
            })
        } 

        window.location.reload(); // updates the sidebar with new data... reloads the page
      
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
                    clearPortfolioToEdit = {this.clearPortfolioToEdit}
                    portfolioToEdit = {this.state.portfolioToEdit}
                    />

                <div className="side-bar">
                    <PortfolioSidebarList 
                    portfolioItems={this.state.portfolioItems}
                    handleDeleteClick = {this.handleDeleteClick}
                    handleEditClick = {this.handleEditClick}
                    />
                </div>
            </div>
        )
    }
}
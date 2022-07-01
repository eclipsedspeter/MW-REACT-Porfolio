import React, { Component } from "react";
import axios from "axios";

export default class PortfolioForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            category: "Category",
            position: 0,
            url: "",
            banner_image: "",
            thumb_image: "",
            logo: "",
            dropdown_categories: []

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleDropdownSelection = this.handleDropdownSelection.bind(this)
        this.buildForm = this.buildForm.bind(this);
    }

    // The dropdown menu uses this data
    // Pre: takes in the portfolio items
    // Post: finds each unique category and updates state
    generateUniqueCategories(items) {
        var unique = []
        var length_ar = items.length
        for(let i = 0; i < length_ar; i++) {
            var temp_category = items[i].category
            if(!unique.includes(temp_category)){unique.push(temp_category)}
        }
        this.setState({
            dropdown_categories: unique
        })
    }

    // Pre: Uses this.state
    // Post: Builds out a FormData sheet with this.state information which can communicate with the API
    buildForm() {
        let formData = new FormData();
        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("protfolio_item[position]", this.state.position)

        return formData

    }

    // Pre: none
    // Post: When the submit button is pressed, the form is submitted. 
    handleOnSubmit(event) {
        // https://maxwhipple.devcamp.space/portfolio/portfolio_items
        axios.post("https://maxwhipple.devcamp.space/portfolio/portfolio_items", this.buildForm(), { withCredentials: true })
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    // Pre: None
    // Post: When any of the inputs are changed, it updates state according
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //Pre: None
    //Post: Updates state according to which dropdown button was pressed
    handleDropdownSelection(event) {
        this.setState({
            category: event.target.id
        })
    }


    // runs only when the new data has been sent it
    componentDidUpdate (prevProps, prevState) {
        if(prevProps !== this.props){
            this.generateUniqueCategories(this.props.portfolioItems);
        }
    }

    render () {
        return (
                <form className="form-container" onSubmit={this.handleOnSubmit}>

                    <div className="left-column-wrapper">
                        <input 
                        type="text"
                        name="name"
                        placeholder="Portfolio Item Name"
                        value={this.state.name}
                        onChange={this.handleChange}/>

                        <input
                        name="position"
                        type="number"
                        pattern = "\d*"
                        placeholder="Portfolio position"
                        value={this.state.position}
                        onChange={this.handleChange}
                        />
                    </div>

                    <div className="right-column-wrapper">
                        <input
                        type="url" 
                        name="url" 
                        placeholder="Portfolio URL"
                        value={this.state.url}
                        onChange={this.handleChange}/>

                        <div className="dropdown-wrapper">
                            <button className="category-dropdown-btn">{this.state.category}</button>
                            <div className="category-dropdown-content">

                                {/* generates a unique set of buttons */}
                                {this.state.dropdown_categories.map(el => {
                                    return(<button type="button" id={el} key={el} onClick={this.handleDropdownSelection}>{el}</button>)
                                })}

                            </div>
                        </div>
                    </div>
                    <div className="bottom-area-wrapper">
                        <textarea type="text"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        />

                        <button type="submit">Submit</button>
                    </div>

                </form>
        )
    }
}

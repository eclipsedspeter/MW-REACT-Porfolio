import React, { Component } from "react";

export default class PortfolioForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            category: "",
            position: 0,
            url: "",
            banner_image: "",
            thumb_image: "",
            logo: "",
            dropdown_categories: []

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.testFunc = this.testFunc.bind(this);

    }

    handleOnSubmit() {
        console.log('Ran')
    }

    testFunc() {
        this.setState({
            dropdown_categories: "buisiness"
        })
        console.log(this.state.dropdown_categories)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    componentDidUpdate (prevProps, prevState) {
        // break condition
        if(prevState.portfolioItems !== this.state.portfolioItems){
            console.log("updated", this.props.portfolioItems)
            this.testFunc();
        }
    }

    render () {
        return (
                <form className="form-container">

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
                        onChange={this.handleChange} // fix this
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
                            <button className="category-dropdown-btn">Category</button>
                            <div className="category-dropdown-content">

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

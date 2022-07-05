import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {

    constructor(props) {
        super(props);

        this.portfolioItems = [...this.props.portfolioItems]

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
        this.buildForm = this.buildForm.bind(this);

        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);

        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);

        this.thumb_ref = React.createRef();
        this.banner_ref = React.createRef();
        this.logo_ref = React.createRef();

    }

    // these handle successful image uploads for dropzone
    handleThumbDrop () {
        return {
            addedfile: file => this.setState({thumb_image: file})
        }
    }

    handleBannerDrop () {
        return {
            addedfile: file => this.setState({banner_image: file})
        }
    }

    handleLogoDrop () {
        return {
            addedfile: file => this.setState({logo: file})
        }
    }


    // react dropzone configuration functions
    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"], // files types
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post" // we only want to submit photos on "sumbit" click
        }
    }

    djsConfig () {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
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
        formData.append("portfolio_item[position]", this.state.position)
        
        if (this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image]", this.state.thumb_image)
        }
        if (this.state.banner_image) {
            formData.append("portfolio_item[banner_image]", this.state.banner_image)
        }
        if (this.state.logo) {
            formData.append("portfolio_item[logo]", this.state.logo)
        }

        return formData

    }

    // Pre: none
    // Post: When the submit button is pressed, the form is submitted. 
    handleOnSubmit(event) {
        event.preventDefault();
        // https://maxwhipple.devcamp.space/portfolio/portfolio_items
        axios.post("https://maxwhipple.devcamp.space/portfolio/portfolio_items", this.buildForm(), { withCredentials: true })
        .then(response => {
            this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);

            // clears the images from dropzone
            [this.thumb_ref, this.banner_ref, this.logo_ref].forEach(ref => {
                ref.current.dropzone.removeAllFiles();
            })

            this.setState({
                name: "",
                description: "",
                category: this.portfolioItems[0].category,
                position: 0,
                url: "",
                banner_image: "",
                thumb_image: "",
                logo: "",
                dropdown_categories: []
            })


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

    // runs only when the new data has been sent it
    componentDidUpdate (prevProps, prevState) {
        if(prevProps !== this.props){
            this.generateUniqueCategories(this.props.portfolioItems);
            this.setState({
                category: this.props.portfolioItems[0].category
            })
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

                    
                        <select name="category" value={this.state.category} onChange={this.handleChange}>
                            {this.state.dropdown_categories.map(el => {
                                return(<option value={el} key={el} onClick={this.handleDropdownSelection}>{el}</option>)
                                })}
                        </select>
                               
                    </div>
                    <div className="bottom-area-wrapper">
                        <textarea type="text"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        />
                        <div className="image-uploaders">

                            {/* Thumb Image */}
                            <DropzoneComponent 
                            ref = {this.thumb_ref}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleThumbDrop()}
                            >
                                <div className="dx-message">Thumbnail</div>
                                <div className="dx-default dz-message"></div>
                            </DropzoneComponent>

                            {/* Banner Image */}
                            <DropzoneComponent 
                            ref = {this.banner_ref}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleBannerDrop()}
                            >
                                <div className="dx-message">Banner</div>
                                <div className="dx-default dz-message"></div>
                            </DropzoneComponent>

                            {/* Logo Image */}
                            <DropzoneComponent 
                            ref = {this.logo_ref}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleLogoDrop()}
                            >
                                <div className="dx-message">Logo</div>
                                <div className="dx-default dz-message"></div>

                            </DropzoneComponent>
                        </div>

                        <button type="submit" onClick={this.handleOnSubmit}>Submit</button>
                    </div>

                </form>
        )
    }
}

import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import "../../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: "",
            description: "",
            category: "",
            position: 0,
            url: "",
            banner_image: "",
            thumb_image: "",
            logo: "",
            editMode: false,
            apiUrl: 'https://maxwhipple.devcamp.space/portfolio/portfolio_items',
            apiAction: "post"

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

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
        if (this.state.logo_url) {
            formData.append("portfolio_item[logo]", this.state.logo)
        }

        return formData

    }

    deleteImage(imageType) {
        axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
        {withCredentials: true})
        .then(response => {
            this.setState({
                [`${imageType}_url`] : ""
            })
        }).catch(error => {
            console.log(error);
        })
    };

    // submits the form
    handleOnSubmit(event) {
        event.preventDefault();
        axios({
            method: this.state.apiAction, // axios methods: post, patch, delete
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        }).then(response => {
            this.props.handleSuccessfulFormSubmission(response.data.portfolio_item, this.state.editMode);

            // clears the images from dropzone
            [this.thumb_ref, this.banner_ref, this.logo_ref].forEach(ref => {
                ref.current.dropzone.removeAllFiles();
            })

            this.setState({
                id: 0,
                name: "",
                description: "",
                category: "",
                position: 0,
                url: "",
                banner_image: "",
                thumb_image: "",
                logo_url: "",
            })

        }).catch(error => {
            console.log(error)
        })
    }

    // Pre: None
    // Post: When any of the form <input> tags are changed, it updates state accordingly
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
        console.log(event.target.value)
    }

    componentDidUpdate (prevProps, prevState) {
        // if a non-empty portfolioToEdit object was passed in
        if(Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id, 
                name,
                description,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit;

            // prevents infinite loop
            this.props.clearPortfolioToEdit(); 

            // populates form
            this.setState({
                id: id,
                name: name || "",
                description: description || "",
                category: category || "",
                position:position ||  0,
                url: url || "",
                editMode: true,
                apiUrl: `https://maxwhipple.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: "patch",
                thumb_image_url: thumb_image_url || "",
                banner_image_url: banner_image_url || "",
                logo_url: logo_url || ""
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
                        min={0}
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
                            
                            {/* option is hidden, but is displayed as the selected category*/}
                            {/* needed for the edit-button feature */}
                            <option style={{display: "none"}}> 
                                {this.state.category === "" ? "Please select a category" : `${this.state.category}` }
                            </option>

                            <option value="Business">Business</option>
                            <option value="eCommerce">eCommerce</option>
                            <option value="Technology">Technology</option>
                            <option value="Education">Education</option>
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
                            {this.state.thumb_image_url && this.state.editMode ?
                                <div className="portfolio-manager-image-wrapper"> 
                                     <div className="dropper-replace-image">
                                        <img src={this.state.thumb_image_url}></img>
                                    </div>
                                    <div className="image-delete-icon">
                                        <a onClick={() => this.deleteImage("thumb_image")}>
                                            <FontAwesomeIcon icon="trash" id="sidebar-delete-icon"/>
                                        </a>
                                    </div>
                                </div> :

                                <DropzoneComponent 
                                ref = {this.thumb_ref}
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleThumbDrop()}
                                >
                                    <div className="dx-message">Thumbnail</div>

                                    {/* disables default message */}
                                    <div className="dx-default dz-message"></div> 

                                </DropzoneComponent>
                            }       

                            {/* Banner Image */}
                            {this.state.banner_image_url && this.state.editMode ?

                                <div className="portfolio-manager-image-wrapper"> 
                                    <div className="dropper-replace-image">
                                        <img src={this.state.banner_image_url}></img>
                                    </div>
                                    <div className="image-delete-icon">
                                        <a onClick={() => this.deleteImage("banner_image")}>
                                            <FontAwesomeIcon icon="trash" id="sidebar-delete-icon"/>
                                        </a>
                                    </div>
        
                                </div> :

                                <DropzoneComponent 
                                ref = {this.banner_ref}
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleBannerDrop()}
                                >
                                    <div className="dx-message">Banner</div>
                                    <div className="dx-default dz-message"></div>
                                </DropzoneComponent>
                            }

                            {/* Logo Image */}
                            {this.state.logo_url && this.state.editMode ?
                                <div className="portfolio-manager-image-wrapper"> 
                                     <div className="dropper-replace-image">
                                        <img src={this.state.logo_url}></img>
                                    </div>
                                    <div className="image-delete-icon">
                                        <a onClick={() => this.deleteImage("logo")}>
                                            <FontAwesomeIcon icon="trash" id="sidebar-delete-icon"/>
                                        </a>
                                    </div>
                                </div>:

                                <DropzoneComponent 
                                ref = {this.logo_ref}
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleLogoDrop()}
                                >
                                    <div className="dx-message">Logo</div>
                                    <div className="dx-default dz-message"></div>

                                </DropzoneComponent>
                            }
                        </div>

                        <button type="submit" onClick={this.handleOnSubmit}>Submit</button>
                    </div>

                </form>
        )
    }
}

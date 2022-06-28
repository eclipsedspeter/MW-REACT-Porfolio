import React, { Component } from 'react';

import login_image from "../../../static/assets/login.jpg";
import Login from "../authorization/login";



export default class auth extends Component {
    constructor(props){
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
        this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this)

    }

    handleSuccessfulAuth () {
        this.props.handleSuccessfulLogin();
        this.props.history.push("/");
    }

    handleUnSuccessfulAuth () {
        this.props.handleUnSuccessfulLogin();
        // this.props.history.push("/");
    }

    render () {
        return (
            <div className="auth-page-wrapper">
                <div className='left-column' 
                style = {{
                    backgroundImage: `url(${login_image})`
                }}/>

                <div className='right-column'>
                    <Login 
                        handleSuccessfulAuth = {this.handleSuccessfulAuth}
                        handleUnSuccessfulAuth = {this.handleUnSuccessfulAuth}
                    />
                </div>
            </div>
        )

    }
}
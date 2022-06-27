import React, { Component } from "react";
import { NavLink } from "react-router-dom";


export default class NavigationContainer extends Component {
    constructor () {
        super();
        this.state = {
            admin: true
        }
    }
    render() {
        return (<div className="navigation-content">

            <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
            <NavLink to="/about-me" activeClassName="nav-link-active">About Me</NavLink>
            <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
            <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
            
            {/* Checks to see if user is admin and if so, renders "add blog" button */}
            {this.state.admin ? <button>Blogs Manager</button> : ""}
            {this.state.admin ? <button>Portfolio Manager</button> : ""}

        </div>
        )
    }s

    // comment
}
import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";


const NavigationContainer = props => {

    const handleLogOut = () => {
        console.log("signout button pressed")
        axios.delete("https://api.devcamp.space/logout", {withCredentials: true})
        .then(response => {
            if(response.status === 200) {
                props.history.push("/");
                props.handleSignOut();
            }
            return response.data
        }).catch(error => {
            console.log("error signing out", error);
        })
    }

    const dynamicLink = (route, linkText)  => {
      return <NavLink to={`${route}`} activeClassName="nav-link-active">{linkText}</NavLink>
    }
    
    return (
        <div className="navigation-content">
            <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
            <NavLink to="/about-me" activeClassName="nav-link-active">About Me</NavLink>
            <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
            <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
            
            {/* Checks to see if user is admin and if so, renders "add blog" button */}
            {props.admin ? dynamicLink("/blog-manager", "Blog | M") : ""}
            {props.admin ? dynamicLink("/portfolio-manager", "Portfolio | M") : ""}

            {props.admin ? <button onClick={handleLogOut}>Sign Out</button> : ""}
            {/* <button onClick={handleLogOut}>Sign Out</button> */}

        </div>
    )};


export default withRouter(NavigationContainer);
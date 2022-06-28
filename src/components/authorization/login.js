import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions", {
            client: {
                password: this.state.password,
                email: this.state.email
            }
        },
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === "created") {
                console.log("access granted")
                this.props.handleSuccessfulAuth();
            } else {
                this.setState({
                    errorText: "wrong email or password"
                })
                this.props.handleUnSuccessfulAuth();
            }

        }).catch(error => {
            console.log(error);
            this.setState({
                errorText: "An error occured"
            });
            this.props.handleUnSuccessfulAuth();

        });
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            errorText: "",
            [event.target.name]: event.target.value
        })
    }
    render () {
        return (
            <div>
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
                <div>{this.state.errorText}</div>

                <form onSubmit={this.handleSubmit}>
                    <input
                     type="email"
                     name="email"
                     placeholder="your email"
                     value={this.state.email}
                     onChange={this.handleChange}
                     />

                    <input 
                    type="password"
                    name="password"
                    placeholder="your password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                
            </div>
        )
    }
}
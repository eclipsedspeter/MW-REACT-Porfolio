import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';



import NavigationContainer from './navigation/NavigationContainer';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from './portfolio/PortfolioDetail';
import Auth from './pages/auth';
import NoMatch from './pages/noMatch';
import BlogManager from './pages/blogManager';
import PortfolioManager from './pages/portfolioManager';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      admin: false,
      updateGrid: false
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      admin: true
    })
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      admin: false
    })
  }

  checkLoginStatus() {
    return axios.get('https://api.devcamp.space/logged_in', { withCredentials: true })
    .then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus
      if(loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggenIn;
        }
      else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          admin: true
        })
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          admin: false
        })
      } 
    }).catch(error => {
      console.log(error);
    })
  }
  
  // signs out
  handleSignOut() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      admin: false,
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedRoutes () {
    return [
      <Route path="/blog-manager" component={BlogManager} key="blog-manager"></Route>,
      <Route path="/portfolio-manager" render={props => (
        <PortfolioManager 
          {...props}
        />
        )} key="portfolio-manager"></Route>
    ]
  }

  render() {
    return (
      <div className='app'>
        
        {/* Sets all paths and path links */}
        <Router>
          <div className="page-container">
            <div className='navigation-container'>
              <NavigationContainer 
                handleSignOut ={this.handleSignOut}
                admin = {this.state.admin}
               />
            </div>
          
            <Switch>
              <Route exact path="/" render= {props => (
                <Home 
                {...props}
                updateGrid = {this.state.updateGrid} // homepage -> portfolio-container to look at API again to gather the new portfolio item
                />
              )}></Route>
              
              <Route path="/about-me" component={About}></Route>
              <Route path="/blog" component={Blog}></Route>
              <Route path="/contact" component={Contact}></Route>

              {this.state.admin ? this.authorizedRoutes() : null}

              <Route 
                exact path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                    />
                  )}
                ></Route>


              <Route exact path="/portfolio/:slug" component={PortfolioDetail}></Route>

              {/* Catch all route...*/}
              <Route component={NoMatch}></Route>
            </Switch>

          </div>
        </Router>
      </div>
    );
  }
}

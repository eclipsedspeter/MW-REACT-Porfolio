import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import moment from "moment";
import axios from 'axios';




import NavigationContainer from './navigation/NavigationContainer';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from './portfolio/PortfolioDetail';
import Auth from './pages/auth';
import NoMatch from './pages/noMatch';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      admin: false,
      data: [],
      changeable_data: []
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);

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

  // Pre: none
  // Post: Retrieves portfolio items from the API... look at devcamp.space for data
  // password for devcamp.space: CodingIsFun123!
  getPortfolioItems () {
    axios.get("https://maxwhipple.devcamp.space/portfolio/portfolio_items")
    .then(response => {
        this.setState({
            data: response.data.portfolio_items,
            changeable_data : response.data.portfolio_items
        })
    })
    .catch(error => {
        console.log(error)
    })
  };

      // allows access to PortfolioItems
      componentDidMount() {
        this.getPortfolioItems();
    }



  render() {
    return (
      <div className='app'>
        
        {/* Sets all paths and path links */}
        <Router>
          <div className="page-container">
            <div className='navigation-container'>
              <NavigationContainer admin={this.state.admin}/>
              <h2>{this.state.loggedInStatus}</h2> 
            </div>
          
            <Switch>
              <Route exact path="/" render={props => (
                <Home 
                data={this.state.data} 
                changeable_data={this.state.changeable_data}
                />)}
                ></Route>
                
              <Route path="/about-me" component={About}></Route>
              <Route path="/blog" component={Blog}></Route>
              <Route path="/contact" component={Contact}></Route>

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

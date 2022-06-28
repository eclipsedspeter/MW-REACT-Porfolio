import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import moment from "moment";



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
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);

  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  render() {
    return (
      <div className='app'>
        
        {/* Sets all paths and path links */}
        <Router>
          <div className="page-container">
            <div className='navigation-container'>
              <NavigationContainer />
              <h2>{this.state.loggedInStatus}</h2> 
            </div>
          
            <Switch>
              <Route exact path="/" component={Home}></Route>
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

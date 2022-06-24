import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import moment from "moment";



import PortfolioContainer from './portfolio/PortfolioContainer';
import NavigationContainer from './navigation/NavigationContainer';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from './portfolio/PortfolioDetail';
import NoMatch from './pages/noMatch';


export default class App extends Component {


  render() {
    return (
      <div className='app'>

        <h1>My first React webpage</h1>
        <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>

        {/* Sets all paths and path links */}
        <Router>
          <div>
            <NavigationContainer />
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/about-me" component={About}></Route>
              <Route path="/blog" component={Blog}></Route>
              <Route path="/contact" component={Contact}></Route>
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

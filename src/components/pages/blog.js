import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from"@fortawesome/react-fontawesome";

import BlogItem from "../blog/blogItem";


class Blog extends Component{

    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true
        }

        this.getBlogItems = this.getBlogItems.bind(this);
        this.activateInfiniteScroll = this.activateInfiniteScroll.bind(this);
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1,
            isLoading: true
        });

        axios.get(`https://maxwhipple.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, {withCredentials: true})
        .then(response => {
            this.setState({
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false
            })
        }).catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.getBlogItems();
    }

    activateInfiniteScroll() {
        window.onscroll = () => {
            if(this.state.isLoading || this.state.blogItems.length === this.state.totalCount) { // will not load items if there is none left
                return null;
            }
            if(window.innerHeight + document.documentElement.scrollTop // loads new items when at the bottom of the scroll
                === document.documentElement.offsetHeight) {
                this.getBlogItems();
                console.log('getting');
            } 
        }
    }
    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            return <BlogItem blogItem={blogItem} key={blogItem.id}/>
        })

        this.activateInfiniteScroll();

        return (
            <div className="blog-container">
                <div className="content-container">
                    {blogRecords}
                </div>

                {this.state.isLoading ? (
                    <div className="content-loader">
                        <FontAwesomeIcon icon="spinner" spin/>
                    </div>
                ) : null } 
            </div>
        )
    };
}

export default Blog;
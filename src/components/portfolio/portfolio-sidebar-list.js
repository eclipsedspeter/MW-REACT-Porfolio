import React from "react";


const portfolioSidebarList = props => {

    const itemList = props.data.map(portfolioItem => {
        return (
            <div className="portfolio-item-thumb">
              <div className="portfolio-thumb-img">
                <img src={portfolioItem.thumb_image_url} />
              </div>
              <h1 className="title">{portfolioItem.name}</h1>
            </div>
          );
        });

    return (
        <div className="portfolio-sidebar-list-wrapper">
            {itemList}
        </div>

    )
}

export default portfolioSidebarList;
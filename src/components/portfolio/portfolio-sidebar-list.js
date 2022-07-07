import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const portfolioSidebarList = props => {

    const itemList = props.portfolioItems.map(portfolioItem => {
        return (
            <div className="portfolio-item-thumb" key={portfolioItem.id}>
              <div className="portfolio-thumb-img">
                <img src={portfolioItem.thumb_image_url} />
              </div>

              <div className="title-icon">
                <h1 className="title">{portfolioItem.name}</h1>
                
                <div className="actions">
                  <a id="action-icons" onClick={() => props.handleEditClick(portfolioItem)}>
                    <FontAwesomeIcon icon="edit" id="sidebar-edit-icon"/>
                  </a>

                  <a id="action-icon" onClick={() => props.handleDeleteClick(portfolioItem)}>
                    <FontAwesomeIcon icon="trash" id="sidebar-delete-icon"/>
                  </a>
                </div>
             
              </div>

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
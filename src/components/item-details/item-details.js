import React from 'react';

import './item-details.css';

const Record = ({ item, field, label}) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
  );
};

const ItemDetails = ({ item, imageURL, children }) => {

    if (!item) {
      return <span>Select item from list</span>;
    }

    return (
      <div className="item-details card">
            <Card
                item={item}
                imageURL={imageURL}
            >
              {React.Children.map(children, (child) => {
                  return React.cloneElement(child, { item });
                })
              }
            </Card>
      </div>
    )
}

function Card ({ item, imageURL, children }) {
  const { name } = item;

  return (
      <React.Fragment>
        <img className="item-image"
             src={imageURL}
        />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {children}
          </ul>
        </div>
      </React.Fragment>
  );
}

export {
    ItemDetails,
    Record
};



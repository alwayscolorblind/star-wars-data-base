import React, { Component } from 'react';

import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

import './item-details.css';

const Record = ({ item, field, label}) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: null,
      imageURL: null,
      loading: true,
      error: false
    };

    this.swapiService = new SwapiService();
  }

  onLoaded = (item, imageURL) => {
    const { getImageURL } = this.props;

    this.setState({
      item,
      imageURL: getImageURL(item),
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      loading: false,
      error: false
    });
  };

  updateItem = () => {
    this.setState({
      loading: true,
      error: false
    });

    const {
      itemId,
      getData
    } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
        .then(this.onLoaded)
        .catch(this.onError);
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    const { itemId } = this.props;

    if (itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  render() {
    const {
      item,
      imageURL,
      loading,
      error
    } = this.state;

    if (!item) {
      return <span>Select item from list</span>;
    }

    return (
      <div className="item-details card">
        {error ? <ErrorIndicator /> : loading ? <Spinner /> :
            <Card
                item={item}
                imageURL={imageURL}
            >
              {React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, { item });
                })
              }
            </Card>
        }
      </div>
    )
  }
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


import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

export default class PersonDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      person: null,
      loading: true,
      error: false
    };

    this.swapiService = new SwapiService();
  }

  onLoaded = (person) => {
    this.setState({
      person,
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

  updatePerson = (id) => {
    this.setState({
      loading: true,
      error: false
    });

    this.swapiService
        .getPerson(id)
        .then(this.onLoaded)
        .catch(this.onError);
  };

  componentDidMount() {
    const id = this.props.personId;

    if (!id) {
      return;
    }

    this.updatePerson(id);
  }

  componentDidUpdate(prevProps) {
    const id = this.props.personId;

    if (id !== prevProps.personId) {
      this.updatePerson(id);
    }
  }

  render() {
    const {
      person,
      loading,
      error
    } = this.state;

    if (!person) {
      return <span>Select person from list</span>;
    }

    return (
      <div className="person-details card">
        {error ? <ErrorIndicator /> : loading ? <Spinner /> : <Card person={person} />}
      </div>
    )
  }
}

function Card ({ person }) {
  const { id, name, gender, birthYear, eyeColor } = person;

  return (
      <div>
        <img className="person-image"
             src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
  );
}


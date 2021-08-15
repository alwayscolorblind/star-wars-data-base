import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import './random-planet.css';

export default class RandomPlanet extends Component {

  constructor(props) {
    super(props);

    this.state = {
      planet: {},
      loading: true,
      error: false
    }

    this.swapiService = new SwapiService();
  }

  componentDidMount() {
    this.updatePlanet();

    this.interval = setInterval(this.updatePlanet, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 20 + 2);
    this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
  }

  render() {
    const {
      planet,
      loading,
      error
    } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        {error ? <ErrorIndicator /> : loading ? <Spinner /> : <PlanetView planet={planet}/>}
      </div>
    );
  }
}

function PlanetView({ planet }) {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
      <div className="random-planet-inner">
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
  )
}



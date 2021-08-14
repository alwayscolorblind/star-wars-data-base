import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from "../spinner";

import './random-planet.css';

export default class RandomPlanet extends Component {

  constructor(props) {
    super(props);

    this.state = {
      planet: {},
      loading: true
    }

    this.swapiService = new SwapiService();

    this.onPlanetLoaded = this.onPlanetLoaded.bind(this);

    this.updatePlanet();
  }

  onPlanetLoaded(planet) {
    this.setState({
      planet,
      loading: false
    });
  }

  updatePlanet() {
    const id = Math.floor(Math.random() * 20 + 2);
    this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded);
  }

  render() {
    const {
      planet: { id, name, population, rotationPeriod, diameter },
      loading
    } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        {loading ? <Spinner /> : <PlanetView
            id={id}
            name={name}
            population={population}
            rotationPeriod={rotationPeriod}
            diameter={diameter}
        />}
      </div>
    );
  }
}

function PlanetView({ id, name, population, rotationPeriod, diameter }) {
  return (
      <div>
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



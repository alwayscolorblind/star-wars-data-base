import React, {Component} from 'react';

import SwapiService from "../../services/swapi-service";

import Row from "../row";
import ItemList from "../item-list";
import ItemDetails, {Record} from "../item-details";

import './planet-page.css';
import ErrorBundle from "../error-bundle";


class PlanetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planetId: null
        };

        this.swapiService = new SwapiService();
    }

    onPlanetSelected = (planetId) => {
        this.setState({
            planetId
        });
    };

    render() {
        const { planetId } = this.state;

        const { getAllPlanets, getPlanet, getPlanetImageURL} = this.swapiService;

        const itemList = (
            <ItemList
                onItemSelected={this.onPlanetSelected}
                getData={getAllPlanets}
            >
                {(item) => `${item.name}`}
            </ItemList>
        );

        const planetDetails = (
            <ItemDetails
                itemId={planetId}
                getData={getPlanet}
                getImageURL={getPlanetImageURL}
            >
                <Record field={'population'} label={'Population'} />
                <Record field={'rotationPeriod'} label={'Rotation Period'} />
                <Record field={'diameter'} label={'Diameter'} />
            </ItemDetails>
        )

        return (
            <ErrorBundle>
                <Row left={itemList} right={planetDetails} />
            </ErrorBundle>
        );
    }
}

export default PlanetPage;
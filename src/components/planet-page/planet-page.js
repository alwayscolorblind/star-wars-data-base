import React, {Component} from 'react';

import Row from "../row";
import {Record} from "../item-details";
import {PlanetDetails, PlanetList} from "../sw-components";
import ErrorBundle from "../error-bundle";

import './planet-page.css';



class PlanetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planetId: null
        };
    }

    onPlanetSelected = (planetId) => {
        this.setState({
            planetId
        });
    };

    render() {
        const { planetId } = this.state;

        const planetList = (
            <PlanetList onItemSelected={this.onPlanetSelected}>
                {({ name }) => `${name}`}
            </PlanetList>
        )

        const planetDetails = (
            <PlanetDetails itemId={planetId}>
                <Record field={'population'} label={'Population'} />
                <Record field={'rotationPeriod'} label={'Rotation Period'} />
                <Record field={'diameter'} label={'Diameter'} />
            </PlanetDetails>
        );

        return (
            <ErrorBundle>
                <Row left={planetList} right={planetDetails} />
            </ErrorBundle>
        );
    }
}

export default PlanetPage;
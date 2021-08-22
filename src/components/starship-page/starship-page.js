import React, {Component} from 'react';

import Row from "../row"
import ErrorBundle from "../error-bundle";
import {Record} from "../item-details";
import {StarshipList, StarshipDetails} from "../sw-components";

import "./starship-page.css";



class StarshipPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starshipId: null
        }
    }

    onStarshipSelected = (starshipId) => {
        this.setState({
            starshipId
        });
    };

    render() {
        const { starshipId } = this.state;

        const starshipList = (
          <StarshipList onItemSelected={this.onStarshipSelected}>
              {({ name }) => `${name}`}
          </StarshipList>
        );

        const starshipDetails = (
            <StarshipDetails itemId={starshipId}>
                <Record field={'model'} label={'Model'} />
                <Record field={'manufacturer'} label={'Manufacturer'} />
                <Record field={'costInCredits'} label={'Cost'} />
                <Record field={'length'} label={'Length'} />
                <Record field={'crew'} label={'Crew'} />
                <Record field={'passengers'} label={'Passengers'} />
                <Record field={'cargoCapacity'} label={'cargoCapacity'} />
            </StarshipDetails>
        );

        return (
            <ErrorBundle>
                <Row left={starshipList} right={starshipDetails} />
            </ErrorBundle>
        );
    }
}

export default StarshipPage;
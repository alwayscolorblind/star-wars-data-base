import React, {Component} from 'react';

import Row from "../row"
import ItemList from "../item-list";
import ErrorBundle from "../error-bundle";
import ItemDetails, {Record} from "../item-details";

import SwapiService from "../../services/swapi-service";

import "./starship-page.css";


class StarshipPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starshipId: null
        }

        this.swapiService = new SwapiService();
    }

    onStarshipSelected = (starshipId) => {
        this.setState({
            starshipId
        });
    };

    render() {
        const { starshipId } = this.state;

        const {
            getAllStarships,
            getStarship,
            getStarshipImageURL
        } = this.swapiService;

        const itemList = (
            <ItemList
                onItemSelected={this.onStarshipSelected}
                getData={getAllStarships}
            >
                {(item) => `${item.name}`}
            </ItemList>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={starshipId}
                getData={getStarship}
                getImageURL={getStarshipImageURL}
            >
                <Record field={'model'} label={'Model'} />
                <Record field={'manufacturer'} label={'Manufacturer'} />
                <Record field={'costInCredits'} label={'Cost'} />
                <Record field={'length'} label={'Length'} />
                <Record field={'crew'} label={'Crew'} />
                <Record field={'passengers'} label={'Passengers'} />
                <Record field={'cargoCapacity'} label={'cargoCapacity'} />
            </ItemDetails>
        );

        return (
            <ErrorBundle>
                <Row left={itemList} right={starshipDetails} />
            </ErrorBundle>
        );
    }
}

export default StarshipPage;
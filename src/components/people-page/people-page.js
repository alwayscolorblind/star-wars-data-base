import React, {Component} from 'react';

import ItemList from "../item-list";
import ItemDetails, {Record} from "../item-details";
import Row from '../row';
import ErrorBundle from "../error-bundle";

import SwapiService from "../../services/swapi-service";

import './people-page.css';


class PeoplePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            personId: null,
        };

        this.swapiService = new SwapiService();
    }

    onPersonSelected = (personId) => {
        this.setState({
            personId
        });
    };

    render() {
        const { personId } = this.state;

        const {
            getAllPeople,
            getPerson,
            getPersonImageURL
        } = this.swapiService;

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={getAllPeople}
            >
                {(item) => `${item.name} (${item.birthYear})`}
            </ItemList>
        );
        const personDetails = (
            <ItemDetails
                itemId={personId}
                getData={getPerson}
                getImageURL={getPersonImageURL}
            >
                <Record field={'gender'} label={'Gender'} />
                <Record field={'birthYear'} label={'Birth Year'} />
                <Record field={'eyeColor'} label={'Eye Color'} />
            </ItemDetails>
        );

        return (
            <ErrorBundle>
                <Row left={itemList} right={personDetails} />
            </ErrorBundle>
        );
    }
}

export default PeoplePage;
import React, {Component} from 'react';

import ItemList from "../item-list";
import PersonDetails from "../person-details";

import './people-page.css';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from '../row';

class PeoplePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            personId: null,
            hasError: false
        };

        this.swapiService = new SwapiService();
    }

    onPersonSelected = (id) => {
        this.setState({
            personId: id
        });
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const { personId } = this.state;

        const itemList = (
            <ItemList
                onPersonSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}
            />
        );
        const personDetails = (
            <PersonDetails personId={personId} />
        );

        return (
            <Row left={itemList} right={personDetails} />
        );
    }
}

export default PeoplePage;
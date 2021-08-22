import React, {Component} from 'react';

import {Record} from "../item-details";
import Row from '../row';
import ErrorBundle from "../error-bundle";
import {PeopleList, PersonDetails} from "../sw-components";

import './people-page.css';



class PeoplePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            personId: null,
        };
    }

    onPersonSelected = (personId) => {
        this.setState({
            personId
        });
    };

    render() {
        const { personId } = this.state;

        const peopleList = (
            <PeopleList onItemSelected={this.onPersonSelected}>
                {({ name }) => `${name}`}
            </PeopleList>
        );

        const personDetails = (
            <PersonDetails itemId={personId}>
                <Record field={'gender'} label={'Gender'} />
                <Record field={'birthYear'} label={'Birth Year'} />
                <Record field={'eyeColor'} label={'Eye Color'} />
            </PersonDetails>
        );

        return (
            <ErrorBundle>
                <Row right={personDetails} left={peopleList}/>
            </ErrorBundle>
        );
    }
}

export default PeoplePage;
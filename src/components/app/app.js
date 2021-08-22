import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page";
import ErrorBundle from "../error-bundle";

import './app.css';


class App extends Component {
    render() {
        return (
            <ErrorBundle>
                <Header/>
                <RandomPlanet/>
                <PeoplePage />
            </ErrorBundle>
        );
    }
}

export default App;
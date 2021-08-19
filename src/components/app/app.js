import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page/people-page";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        }
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {
        const { hasError } = this.state;

        if (hasError) {
            return <ErrorIndicator />
        }

        return (
            <div>
                <Header/>
                <RandomPlanet/>
                <PeoplePage />
            </div>
        );
    }
}

export default App;
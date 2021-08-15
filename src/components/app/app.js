import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItemId: null
        }
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItemId: id
        });
    };

    render() {
        const { selectedItemId } = this.state;

        return (
            <div>
                <Header/>
                <RandomPlanet/>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onItemSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={selectedItemId}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
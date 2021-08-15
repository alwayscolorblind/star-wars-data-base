import React, {Component} from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

export default class ItemList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: null,
            loading: true,
            error: false
        };

        this.swapiService = new SwapiService();
    }

    componentDidMount() {
        this.updateList();
    }

    onLoaded = (list) => {
        this.setState({
            list: list,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateList = () => {
        this.swapiService
            .getAllPeople()
            .then(this.onLoaded)
            .catch(this.onError);
    }

    renderItems(list) {
        return list.map((item) => {
            return (
                <li className="list-group-item"
                    key={item.id}
                    onClick={() => this.props.onItemSelected(item.id)}
                >
                    {item.name}
                </li>
            );
        });
    }

    render() {
        const {
            list,
            loading,
            error
        } = this.state;

        const items = list ? this.renderItems(list) : null;

        return (
            <ul className="item-list list-group">
                {error ? <ErrorIndicator /> : loading ? <Spinner /> : items}
            </ul>
        );
    }
}

import React, {Component} from 'react';

import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import ItemList from "../item-list";

const withData = (WrappedComponent, getData) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                list: null,
                loading: true,
                error: false
            };
        }

        componentDidMount() {
            this.updateList();
        }

        onLoaded = (list) => {
            this.setState({
                list: list,
                loading: false,
                error: false
            });
        };

        onError = () => {
            this.setState({
                loading: false,
                error: true
            });
        };

        updateList = () => {
            getData()
                .then(this.onLoaded)
                .catch(this.onError);
        };

        render() {
            const {
                list,
                loading,
                error
            } = this.state;

            return (
                error ? <ErrorIndicator /> : loading ? <Spinner /> : <ItemList {...this.props} list={list}/>
            );
        }
    };
}

export default withData;
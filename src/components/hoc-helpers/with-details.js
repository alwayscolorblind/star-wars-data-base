import React, {Component} from 'react';

import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

const withDetails = (WrappedComponent, getData, getImageURL) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                item: null,
                imageURL: null,
                loading: true,
                error: false
            };
        }

        onLoaded = (item) => {
            this.setState({
                item,
                imageURL: getImageURL(item),
                loading: false,
                error: false
            });
        };

        onError = () => {
            this.setState({
                loading: false,
                error: false
            });
        };

        updateItem = () => {
            this.setState({
                loading: true,
                error: false
            });

            const { itemId } = this.props;

            if (!itemId) {
                return;
            }

            getData(itemId)
                .then(this.onLoaded)
                .catch(this.onError);
        };

        componentDidMount = () => {
            this.updateItem();
        };

        componentDidUpdate = (prevProps) => {
            const { itemId } = this.props;

            if (itemId !== prevProps.itemId) {
                this.updateItem();
            }
        };

        render = () => {
            const {
                item,
                imageURL,
                loading,
                error
            } = this.state;

            if (!item) {
                return <span>Select item from list</span>;
            }

            return (
                error ? <ErrorIndicator /> : loading ? <Spinner /> : <WrappedComponent
                    {...this.props}
                    imageURL={imageURL}
                    item={item}
                />
            );
        };
    };
}

export {
    withDetails
};
import React, { Component } from 'react';

import ErrorIndicator from "../error-indicator";

import './error-bundle.css';


class ErrorBundle extends Component {
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
        const { children } = this.props;
        const { hasError } = this.state;

        return hasError ? <ErrorIndicator /> : children;
    }
}

export default ErrorBundle;

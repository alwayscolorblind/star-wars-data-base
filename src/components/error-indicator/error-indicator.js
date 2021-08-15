import React from 'react';

import './error-indicator.css';
import {ReactComponent as Icon} from './death-star.svg';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <Icon className="icon"/>
            <span className="boom">Boom!</span>
            <span>
                Something went terribly wrong
            </span>
            <span>
                (but we already sent droids to fix it)
            </span>
        </div>
    );
};

export default ErrorIndicator;

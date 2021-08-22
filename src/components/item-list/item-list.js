import React from 'react';

import './item-list.css';

const ItemList = ({ list, onItemSelected, children: renderLabel }) => {

    const renderItems = (list) => {
        return list.map((item) => {
            const label = renderLabel(item);

            return (
                <li className="list-group-item"
                    key={item.id}
                    onClick={() => onItemSelected(item.id)} >
                    {label}
                </li>
            );
        });
    };

    const items = list ? renderItems(list) : null;

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
};

export default ItemList;

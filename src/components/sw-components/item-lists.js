import React from "react";

import ItemList from "../item-list";
import withData from "../hoc-helpers/with-data";

import SwapiService from "../../services/swapi-service";

const {
    getAllPeople,
    getAllPlanets,
    getAllStarships
} = new SwapiService();

const PeopleList = withData(ItemList, getAllPeople);
const PlanetList = withData(ItemList, getAllPlanets);
const StarshipList = withData(ItemList, getAllStarships);

export {
    PeopleList,
    PlanetList,
    StarshipList
};
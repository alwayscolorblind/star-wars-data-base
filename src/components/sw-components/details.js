import React from "react";

import SwapiService from "../../services/swapi-service";

import { withDetails } from "../hoc-helpers/with-details";
import { ItemDetails } from "../item-details";

const {
    getPerson,
    getPlanet,
    getStarship,
    getPersonImageURL,
    getPlanetImageURL,
    getStarshipImageURL
} = new SwapiService();

const PersonDetails = withDetails(ItemDetails, getPerson, getPersonImageURL);
const StarshipDetails = withDetails(ItemDetails, getStarship, getStarshipImageURL);
const PlanetDetails = withDetails(ItemDetails, getPlanet, getPlanetImageURL);

export {
    PersonDetails,
    StarshipDetails,
    PlanetDetails
};
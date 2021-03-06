export default class SwapiService {
    _apiBase = 'https://swapi.dev/api';
    _imageURLBase = 'https://starwars-visualguide.com/assets/img';

    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Couldn't fetch url: ${url}. Response status: ${response.status}`);
        }

        return await response.json();
    };

    getAllPeople = async () => {
        const result = await this.getResource(`/people/`);
        return result.results.map((item) => this._transformPerson(item));
    };

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    };

    getAllPlanets = async () => {
        const result = await this.getResource(`/planets/`);
        return result.results.map((item) => this._transformPlanet(item));
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet);
    };

    getAllStarships = async () => {
        const result = await this.getResource(`/starships/`);
        return result.results.map((item) => this._transformStarship(item));
    }

    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}`);
        return this._transformStarship(starship);
    }

    getPersonImageURL = ({ id }) => {
        return `${this._imageURLBase}/characters/${id}.jpg`;
    };

    getStarshipImageURL = ({ id }) => {
        return `${this._imageURLBase}/starships/${id}.jpg`;
    };

    getPlanetImageURL = ({ id }) => {
        return `${this._imageURLBase}/planets/${id}.jpg`;
    };

    _extractId = (url) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return url.match(idRegExp)[1];
    }

    _transformPlanet = ({ url, name, population, rotation_period, diameter }) => {
        return {
            id: this._extractId(url),
            name,
            population,
            rotationPeriod: rotation_period,
            diameter
        };
    }

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship.url),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        };
    }

    _transformPerson = ({ url, name, gender, birth_year, eye_color }) => {
        return {
            id: this._extractId(url),
            name,
            gender,
            birthYear: birth_year,
            eyeColor: eye_color
        };
    }
}
export default class SwapiService {
    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Couldn't fetch url: ${url}. Response status: ${response.status}`);
        }

        return await response.json();
    }

    async getAllPeople() {
        const result = await this.getResource(`/people/`);
        return result.results.map((item) => {
            return this._transformPerson(item);
        });
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}`)
        return this._transformPerson(person);
    }

    async getAllPlanets() {
        const result = await this.getResource(`/planets/`);
        return result.results;
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    async getAllStarships() {
        const result = await this.getResource(`/starships/`);
        return result.results;
    }

    async getStarship(id) {
        const starship = await this.getResource(`/starship/${id}`);
        return this._transformStarship(starship);
    }

    _extractId(url) {
        const idRegExp = /\/([0-9]*)\/$/;
        return url.match(idRegExp)[1];
    }

    _transformPlanet({ url, name, population, rotation_period, diameter }) {
        return {
            id: this._extractId(url),
            name,
            population,
            rotationPeriod: rotation_period,
            diameter
        };
    }

    _transformStarship(starship) {
        return {
            id: this._extractId(starship.url),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        };
    }

    _transformPerson({ url, name, gender, birt, eyeColor }) {
        return {
            id: this._extractId(url),
            name,
            gender,
            birthYear: birt,
            eyeColor
        };
    }
}
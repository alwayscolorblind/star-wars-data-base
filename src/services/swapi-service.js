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
        return result.results;
    }

    getPerson(id) {
        return this.getResource(`/people/${id}`);
    }

    async getAllPlanets() {
        const result = await this.getResource(`/planets/`);
        return result.results;
    }

    getPlanet(id) {
        return this.getResource(`/planets/${id}`);
    }

    async getAllStarships() {
        const result = await this.getResource(`/starships/`);
        return result.results;
    }

    getStarship(id) {
        return this.getResource(`/starship/${id}`);
    }
}
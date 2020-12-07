import axios from 'axios';

const API_URL = 'https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes';

function request() {
    return axios.get(API_URL);
}

export {
    request
}
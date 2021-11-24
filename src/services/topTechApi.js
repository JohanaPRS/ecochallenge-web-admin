import axios from 'axios';


const baseURL = 'https://ecochallenge-apis.herokuapp.com';
//const baseURL = 'http://localhost:9000';

const topTechApi = axios.create({baseURL});

export default topTechApi;
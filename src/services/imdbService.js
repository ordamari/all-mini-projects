import axios from "axios";

export const imdbService = {
    get250Moviews
}

const lang = 'en'
const apiKey = 'k_u0kr2ud3'

async function get250Moviews() {
    const res = await axios.get(`https://imdb-api.com/${lang}/API/Top250Movies/${apiKey}`);
    return res
}
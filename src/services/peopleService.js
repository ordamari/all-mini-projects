import axios from "axios";
import peoples from "../assets/jsons/peoples.json"

export const peopleService = {
    get,
    getSync
}

async function get(page) {
    const res = await axios.get(`https://randomuser.me/api/?results=10&page=${page}`);
    return res.data.results
}

function getSync() {
    return peoples.peoples
}
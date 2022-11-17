import axios from "axios"

export const imageService = {
    get
}

const unsplashClientId = "PA3Oow8kvS9lXoH0KnT7yxn2e_FAaKFzROSIXsAdPNE"


async function get(query, page) {
    const unsplushUrl = 'https://api.unsplash.com/search/photos/?'
    const res = await axios.get(`${unsplushUrl}client_id=${unsplashClientId}&query=${query}&page=${page}`)
    return res.data
}
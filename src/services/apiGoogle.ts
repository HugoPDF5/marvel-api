import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/js?key=' + import.meta.env.VITE_API_URL_GOOGLE_KEY
})
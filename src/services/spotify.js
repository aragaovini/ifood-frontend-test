import axios from 'axios'
import { 
    verifyLogin,
    verifyParams,
    getToken
} from '../auth/spotify'
const queryString = require('query-string')

const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1/browse'
})

spotifyApi.interceptors.request.use(async config => {
    try {
        verifyParams()
        const token = getToken()
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    } catch(error) {
        console.log('Login validation failed.')
    }
  });

  spotifyApi.interceptors.response.use(undefined, err => {
    if (err.response.status === 401) {
        verifyLogin()
    }
  })

const getFeaturedPlaylist = (query) => {
    let queryParams = {}
    if (query) {
        queryParams = queryString.stringify(query)
    }
    return spotifyApi.get(query ? `featured-playlists?${queryParams}` : 'featured-playlists')
}

export {
    getFeaturedPlaylist
}
import axios from 'axios'
import { 
    verifyLogin,
    verifyParams,
    getToken, 
    resetToken
} from '../auth/spotify'

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
    const token = getToken()
    if (err.response.status === 401 && token) {
        resetToken()
        verifyLogin()
    }
  })

const getFeaturedPlaylist = () => {
    return spotifyApi.get('featured-playlists')
}

export {
    getFeaturedPlaylist
}
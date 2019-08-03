import axios from 'axios'
import { 
    verifyLogin, 
    getToken, 
    resetToken
} from '../auth/spotify'

const api = axios.create({
    baseURL: 'https://api.spotify.com/v1/browse'
})

api.interceptors.request.use(async config => {
    try {
        await verifyLogin()
        const token = getToken()
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    } catch(error) {
        console.log('Login validation failed.')
    }
  });

api.interceptors.response.use(undefined, err => {
    const token = getToken()
    if (err.response.status === 401 && token) {
        resetToken()
        verifyLogin()
    }
  })


const getFeaturedPlaylist = () => {
    return api.get('featured-playlists')
}

export {
    getFeaturedPlaylist
}
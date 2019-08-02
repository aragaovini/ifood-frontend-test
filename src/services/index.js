import axios from 'axios'

const token = localStorage.getItem('token')

const api = axios.create({
    baseURL: 'https://api.spotify.com/v1/browse',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})


const getFeaturedPlaylist = () => {
    return api.get('featured-playlists')
}

export {
    getFeaturedPlaylist
}
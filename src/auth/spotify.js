const SPOTIFY_URL_AUTHORIZE = 'https://accounts.spotify.com/authorize'
const CLIENT_ID = '5b444b2c79c34c7c99b4c8e2db1d32dd'
const CURRENT_URL = `http://localhost:3000`

const hasAlreadyLoggedIn = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('code')
}


const requireLogin = () => {
    if (!hasAlreadyLoggedIn()) {
        const scopes = 'user-read-private user-read-email'
        const url = `${SPOTIFY_URL_AUTHORIZE}?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(CURRENT_URL)}`
        
        window.location.href = url
    }
}

export {
    requireLogin
} 
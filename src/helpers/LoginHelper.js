import axios from 'axios'
import jwt_decode from 'jwt-decode'
import moment from 'moment-timezone'
import store from '@/store/index.js';

const isLoged = () => {
    const access = localStorage.getItem('access')
    const refresh = localStorage.getItem('refresh')
    if (access && refresh) {
        const accessPayload = jwt_decode(access)
        const refreshPayload = jwt_decode(refresh)
        const now = moment().tz('America/Bogota').unix()
        if (now < accessPayload.exp) {
            console.log(accessPayload.user_id, access);
            const res = store.dispatch('getUser', { id: accessPayload.user_id, token: access })
            console.log(res);
        } else {
            refreshToken()
        }

        return true
    }
    return false
}

const refreshToken = () => {

}

const setLogin = (username, password) => {
    const body = {
        username,
        password
    }
    return new Promise((resolve, reject) => {
        axios.post('https://overidebusapp.herokuapp.com/api/token/', body)
            .then(res => {
                if (res.request.status === 200 && res.data) {
                    localStorage.setItem('access', res.data.access)
                    localStorage.setItem('refresh', res.data.refresh)
                }
                resolve({ message: 'Bienvenido' })
            })
            .catch(err => {
                reject(err.response)
            })
    })
}

export { setLogin, isLoged }
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import moment from 'moment-timezone'
import store from '@/store/index.js';

const isLoged = (username = null, password = null) => {
    /* Comprueba si el usuario se encuentra logeado o no */


    // if (isThereAToken(access, refresh)) {
    //     if (isAValidToken(access) || isAValidToken(refresh)) {
    //         refreshAccesToken(refresh)
    //             .then(res => {
    //                 access = res.data.access
    //                 const id = jwt_decode(access).user_id
    //                 getUserData(access)
    //                     .then(res => {
    //                         const user = { id, ...res.data }
    //                         store.commit('setUser', user)
    //                         store.commit('setIsLoged', true)
    //                     })
    //             })
    //     }
    // }

    let access = localStorage.getItem('access')
    let refresh = localStorage.getItem('refresh')
    isThereAToken(access, refresh, username, password)
        .then(() => {
            access = localStorage.getItem('access')
            refresh = localStorage.getItem('refresh')
            if (isAValidToken(access) || isAValidToken(refresh)) {
                refreshAccesToken(refresh)
                    .then(res => {
                        access = res.data.access
                        const id = jwt_decode(access).user_id
                        getUserData(access)
                            .then(res => {
                                const user = { id, ...res.data }
                                store.commit('setUser', user)
                                store.commit('setIsLoged', true)
                            })
                    })
            }

        })
}

const isThereAToken = (access, refresh, username = null, password = null) => {
    /* Comprueba si existe el access token y el refresh token en el local storage */
    return new Promise((resolve, reject) => {
        if (access && refresh) {
            resolve(true)
        } else {
            const body = {
                username,
                password
            }
            axios.post('https://overidebusapp.herokuapp.com/api/token/', body)
                .then(res => {
                    const access = res.data.access
                    const refresh = res.data.refresh
                    localStorage.setItem('access', access)
                    localStorage.setItem('refresh', refresh)
                    resolve(true)
                })
        }
    })
}

const isAValidToken = (token) => {
    /* Comprueba la fecha de caducidad del token */
    const accesTokenPayload = jwt_decode(token)
    const expTime = accesTokenPayload.exp
    const now = moment().tz('America/Bogota').unix()
    if (now < expTime) {
        return true
    } else {
        return false
    }
}

const refreshAccesToken = async (token) => {
    /* Refresca el acces token mediante el uso del refresh token */
    try {
        const body = {
            refresh: token
        }
        return await axios.post('https://overidebusapp.herokuapp.com/api/token/refresh/', body)

    } catch (error) {
        return null
    }
}

const getUserData = async (token) => {
    const { user_id } = jwt_decode(token)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        return await axios.get(`https://overidebusapp.herokuapp.com/api/users/${user_id}`, config)
    } catch (error) {
        console.log(error);
    }
}

const logout = () => {
    localStorage.clear()
    store.commit('setIsLoged', false)
    store.commit('deleteUser')


}

export { isLoged, logout }
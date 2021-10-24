import axios from 'axios'
import jwt_decode from 'jwt-decode'
import moment from 'moment-timezone'
import store from '@/store/index.js';

// const isLoged = (username = null, password = null) => {
//     /* Comprueba si el usuario se encuentra logeado o no */

//     return new Promise (resolve, reject) => {

//     }

//     let access = localStorage.getItem('access')
//     let refresh = localStorage.getItem('refresh')
//     isThereAToken(access, refresh, username, password)
//         .then(() => {
//             access = localStorage.getItem('access')
//             refresh = localStorage.getItem('refresh')
//             if (isAValidToken(access) || isAValidToken(refresh)) {
//                 refreshAccesToken(refresh)
//                     .then(res => {
//                         access = res.data.access
//                         const id = jwt_decode(access).user_id
//                         getUserData(access)
//                             .then(res => {
//                                 const user = { id, ...res.data }
//                                 store.commit('setUser', user)
//                                 store.commit('setIsLoged', true)
//                             })
//                     })
//             }

//         })
// }

// const isThereAToken = (access, refresh, username = null, password = null) => {
//     /* Comprueba si existe el access token y el refresh token en el local storage */
//     return new Promise((resolve, reject) => {
//         if (access && refresh) {
//             resolve(true)
//         } else {
//             const body = {
//                 username,
//                 password
//             }
//             axios.post('https://overidebusapp.herokuapp.com/api/token/', body)
//                 .then(res => {
//                     const access = res.data.access
//                     const refresh = res.data.refresh
//                     localStorage.setItem('access', access)
//                     localStorage.setItem('refresh', refresh)
//                     resolve(true)
//                 })
//         }
//     })
// }

// const isAValidToken = (token) => {
//     /* Comprueba la fecha de caducidad del token */
//     const accesTokenPayload = jwt_decode(token)
//     const expTime = accesTokenPayload.exp
//     const now = moment().tz('America/Bogota').unix()
//     if (now < expTime) {
//         return true
//     } else {
//         return false
//     }
// }

// const refreshAccesToken = async (token) => {
//     /* Refresca el acces token mediante el uso del refresh token */
//     try {
//         const body = {
//             refresh: token
//         }
//         return await axios.post('https://overidebusapp.herokuapp.com/api/token/refresh/', body)

//     } catch (error) {
//         return null
//     }
// }

// const getUserData = async (token) => {
//     const { user_id } = jwt_decode(token)
//     const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     };
//     try {
//         return await axios.get(`https://overidebusapp.herokuapp.com/api/users/${user_id}`, config)
//     } catch (error) {
//         console.log(error);
//     }
// }

// const logout = () => {
//     localStorage.clear()
//     store.commit('setIsLoged', false)
//     store.commit('deleteUser')


// }

const startLoginProcess = (username, password) => {
    /* Promesa que inicia todo el proceso de logeo y llama a la promesa que verifica si hay tokens guardados en el localstorage */
    return new Promise((resolve) => {
        resolve(isTokenStored(username, password))
    })
}

const isTokenStored = (username, password) => {
    /* Promesa que verifica si existen tokens de autenticacion guardados en el local storage, si se le entrega un usuario y contraseña, llama a la promesa encargada de obtener los tokens, de lo contrario si el token de acceso es valido llama a la promesa que obtiene la informacion del usuario, si no llama a la promesa que refresca el token de acceso */
    return new Promise((resolve, reject) => {
        const accessTokenStored = localStorage.getItem('access')
        const refreshTokenStored = localStorage.getItem('refresh')
        if (username && password) {
            resolve(getTokens(username, password))
        } else if (accessTokenStored && refreshTokenStored) {
            if (isTokenValid(accessTokenStored)) {
                const userId = getUserIdFromToken(accessTokenStored)
                resolve(getUserData(userId))
            } else if (isTokenValid(refreshTokenStored)) {
                resolve(refreshTokens(refreshTokenStored))
            }
        } else {
            reject({ state: false, message: 'No existen credenciales de autenticacion' })
        }
    })
}

const getTokens = (username, password) => {
    /* Promesa que obtiene los tokens de acceso de la API con el usuario y contraseña proporcionados, guardarlos en el local storage y llamar a la promesa que se encarga de obtener la informacion del usuario */
    return new Promise((resolve, reject) => {
        const body = {
            username,
            password
        }
        axios.post('https://overidebusapp.herokuapp.com/api/token/', body)
            .then(res => {
                localStorage.setItem('access', res.data.access)
                localStorage.setItem('refresh', res.data.refresh)
                const userId = getUserIdFromToken(res.data.access)
                resolve(getUserData(userId))
            })
            .catch(() => {
                reject({ state: false, message: 'Error en el servidor al obtener las credenciales de autenticacion' })
            })
    })
}

const refreshTokens = (token) => {
    /* Promesa encargada de refrescar el token de acceso, guardarlos en el local storage y llamar a la promesa que se encarga de obtener la informacion del usuario */
    return new Promise((resolve, reject) => {
        const body = {
            refresh: token
        }
        axios.post('https://overidebusapp.herokuapp.com/api/token/refresh/', body)
            .then(res => {
                localStorage.setItem('access', res.data.access)
                const userId = getUserIdFromToken(res.data.access)
                resolve(getUserData(userId))
            })
            .catch(() => {
                reject({ state: false, message: 'Error en el servidor al refrescar las credenciales de autenticacion' })
            })
    })
}

const isTokenValid = (token) => {
    /* Funcion encargada de decodificar el token proporcionado y verificar que la fecha contenida en el payload sea valida */
    const tokenPayload = jwt_decode(token)
    const tokenExpirationTime = tokenPayload.exp
    const nowTime = moment().tz('America/Bogota').unix()
    if (nowTime < tokenExpirationTime) {
        return true
    }
    else {
        return false
    }
}

const getUserIdFromToken = (token) => {
    /* Funcion encargada de decodificar el token proporcionado y devolver el id del ususario contenido en el payload */
    const tokenPayload = jwt_decode(token)
    return tokenPayload.user_id
}

const getUserData = (id) => {
    /* Promesa encargada de obtener el token del localstorage, obtener la informacion del usuario de la API con el id proporcionado y el token obtenido, guardar la informacion del usuario en el storage y devolver una respuesta del proceso */
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('access')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`https://overidebusapp.herokuapp.com/api/users/${id}`, config)
            .then(res => {
                const user = { id, ...res.data }
                store.commit('setUser', user)
                store.commit('setIsLoged', true)
                resolve({ state: true, message: `Bienvenido ${user.name}` })
            })
            .catch(() => {
                reject({ state: false, message: 'Error en el servidor al obtener la informacion del usuario' })
            })
    })
}

const isLoged = (username = null, password = null) => {
    /* Promesa que inicia el proceso de logeo de manera externa */
    return new Promise((resolve, reject) => {
        startLoginProcess(username, password)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const startLogoutProcess = () => {
    /* Promesa que elimina la informacion del local storage y del storage de la aplicacion */
    return new Promise((resolve) => {
        localStorage.clear()
        store.commit('setIsLoged', false)
        store.commit('deleteUser')
        resolve({ state: true, message: 'Usuario desconectado correctamente' })
    })
}

const isDisconected = () => {
    /* Promesa que inicia todo el proceso de deslogueo */
    return new Promise((resolve) => {
        startLogoutProcess()
            .then(res => {
                resolve(res)
            })
    })
}

export { isLoged, isDisconected }
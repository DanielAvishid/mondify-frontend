import { showSuccessMsg } from "../../services/event-bus.service";
import { userService } from "../../services/user.service";
import { SET_USER } from "../reducers/user.reducer";
import { store } from "../store"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }
}

export function loginGuest() {
    const user = userService.getDefaultUser()
    console.log(user, 'Actions')
    store.dispatch({ type: SET_USER, user })
    const timeoutId = setTimeout(() => {
        showSuccessMsg(`Welcome Guest, you successfully logged in`)
        clearTimeout(timeoutId)
    }, 500)
    return user
}
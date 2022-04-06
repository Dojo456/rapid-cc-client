import React from "react";
import { GoogleLoginResponse } from "react-google-login";

export interface AuthProviderContext {
    login: (user: GoogleLoginResponse) => void,
    logout: () => void,
    getUser: () => GoogleLoginResponse | undefined,
    isSignedIn: () => boolean
}

const AuthContext: React.Context<AuthProviderContext> = React.createContext<AuthProviderContext>({
    login: () => {},
    logout: () => {},
    getUser: () => undefined,
    isSignedIn: () => false
})

const storage = localStorage
const storageKey = "user"

export class AuthProvider extends React.Component {
    #user: GoogleLoginResponse | undefined

    login(user: GoogleLoginResponse) {
        this.#user = user

        storage.setItem(storageKey, JSON.stringify(user))
    }

    logout() {
        storage.removeItem(storageKey)
    }

    getUser(): GoogleLoginResponse | undefined {
        // TODO change this to use auth library of some sort

        const data = storage.getItem(storageKey)

        if (data !== null) {
            return JSON.parse(data)
        }
        else {
            return undefined
        }
    }

    isSignedIn(): boolean {
        // TODO make this abstraction of getUser()

        const data = storage.getItem("user")

        if (data !== null) {
            return true
        }
        else {
            return false
        }
    }

    render() {
        return(
            <AuthContext.Provider value={{ login: this.login, logout: this.logout, getUser: this.getUser, isSignedIn: this.isSignedIn }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

    constructor(props: any) {
        super(props)

        this.render = this.render.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.getUser = this.getUser.bind(this)
        this.isSignedIn = this.isSignedIn.bind(this)
    }
}

export default AuthContext
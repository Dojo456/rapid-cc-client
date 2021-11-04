import React from "react";
import { GoogleLoginResponse } from "react-google-login";

export interface AuthProviderContext {
    login: (user: GoogleLoginResponse) => void,
    logout: () => void,
    getUser: () => GoogleLoginResponse | undefined
}

const AuthContext: React.Context<AuthProviderContext> = React.createContext<AuthProviderContext>({
    login: () => {},
    logout: () => {},
    getUser: () => undefined
})

const storage = localStorage

export class AuthProvider extends React.Component {
    #user: GoogleLoginResponse | undefined

    login(user: GoogleLoginResponse) {
        this.#user = user

        storage.setItem("token", user.accessToken)
    }

    logout() {
        storage.removeItem("token")
    }

    getUser(): GoogleLoginResponse | undefined {
        return this.#user
    }

    render() {
        return(
            <AuthContext.Provider value={{ login: this.login, logout: this.logout, getUser: this.getUser }}>
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
    }
}

export default AuthContext
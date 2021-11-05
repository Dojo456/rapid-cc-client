import React from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AuthContext, { AuthProviderContext } from "../auth/auth-provider";

const clientID = "436668816969-l4uica2hifv8ua5sbsaokj5dfoboje2u.apps.googleusercontent.com"

class Login extends React.Component<RouteComponentProps> {
    static contextType = AuthContext;

    onSuccessfulLogin(resp: GoogleLoginResponse | GoogleLoginResponseOffline) {
        const user = resp as GoogleLoginResponse
        console.log(user)

        const AuthProvider: AuthProviderContext = this.context
        AuthProvider.login(user)

        const path = "/home"
        this.props.history.push(path, { from: "Login" })
    }

    onFailedLogin(error: any) {
        console.log(error)

        const path = "/"
        this.props.history.push(path)
    }

    constructor(props: any) {
        super(props)

        this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this)
        this.onFailedLogin = this.onFailedLogin.bind(this)
    }

    render() {
        return (
            <div className="Page">
                <div style={{ display: "contents", margin: "auto" }}>
                    <GoogleLogin
                        accessType="online"
                        clientId={clientID}
                        buttonText="Login"
                        onSuccess={this.onSuccessfulLogin}
                        onFailure={this.onFailedLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Login)
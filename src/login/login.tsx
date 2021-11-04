import React from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { RouteComponentProps, useHistory, useLocation, withRouter } from "react-router-dom";

const clientID = "436668816969-5q7pmlbtcan1rvs3lqr85kdlrvkdngui.apps.googleusercontent.com"

class Login extends React.Component<RouteComponentProps> {
    onSuccessfulLogin(resp: GoogleLoginResponse | GoogleLoginResponseOffline) {
        const user = resp
        console.log(user)

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
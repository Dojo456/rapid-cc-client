import React from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

const clientID = "436668816969-5q7pmlbtcan1rvs3lqr85kdlrvkdngui.apps.googleusercontent.com"

interface LoginPageProps {
    onSuccessResponse: (resp: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
    onFailureResponse: (error: any) => void
}

export class Login extends React.Component<LoginPageProps> {
    render() {
        return (
            <div className="Page">
                  <div style={{ display:"contents", margin:"auto" }}>
                    <GoogleLogin 
                    clientId={clientID}
                    buttonText="Login"
                    onSuccess={this.props.onSuccessResponse}
                    onFailure={this.props.onFailureResponse}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                    />
                </div> 
            </div>
        )
    }
}
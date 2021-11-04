import React from "react";
import { GoogleLoginResponse } from "react-google-login";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AuthContext, { AuthProviderContext } from "../auth/auth-provider";
import { CalendarEvent } from "../models/event";
import { Calendar } from "./calendar";

interface HomePageState {
  data: CalendarEvent[]
}

class Home extends React.Component<RouteComponentProps, HomePageState> {
  static contextType = AuthContext

  signOut() {
    console.log("Signing out")
    const AuthProvider: AuthProviderContext = this.context

    AuthProvider.logout()

    const path = "/"
    this.props.history.push(path)
  }

  constructor(props: any) {
    super(props)

    this.signOut = this.signOut.bind(this)
    this.state = {
      data: [],
    }
  }

  render() {
    const log = () => {
      console.log(this.state.data)
    }

    const AuthProvider: AuthProviderContext = this.context
    const user = AuthProvider.getUser()

    if (user === undefined) {
      const path = "/"
      this.props.history.push(path)
      return null
    }
    else {
      return (
        <div className="Page">
          <div style={{ height: "10%", display: "flex", alignItems: "center", textAlign: "center" }}>
            <h1 style={{ display: "inline-block" }}>Rapid Contact Tracer</h1>
            <button onClick={this.signOut} style={{ display: "inline-block", position: "absolute", right: "30px" }}>
              Contact Trace
            </button>
            <button onClick={log} style={{ display: "inline-block", position: "absolute", right: "30px" }}>
              Log Data
            </button>
          </div>
          <p>{JSON.stringify(user.getBasicProfile())}</p>
          <div className='calendar' style={{ width: "80%", height: "90%", overflow: 'hidden' }}>
            <Calendar events={this.state.data}/>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    fetch("https://us-central1-poetic-tube-331012.cloudfunctions.net/getCalendar")
      .then(
        async (resp) => {
          const rawData: any[] = await resp.json()
          const data = rawData.map(event => {
            event.date = new Date(event.date)

            return event
          })

          console.log(data)
          this.setState({
            data: data
          })
        },
        (reason) => {
          console.error(reason)
        }
      )
  }
}

export default withRouter(Home)
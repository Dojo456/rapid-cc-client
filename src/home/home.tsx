import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AuthContext, { AuthProviderContext } from "../auth/auth-provider";
import { EventModel, IndividualModel } from "./models";
import { Calendar } from "./calendar";
import UsersList from "./users-list";

interface HomePageState {
  data: EventModel[]
  contactUsers: Set<IndividualModel>
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
    this.fetchCalendar = this.fetchCalendar.bind(this)
    this.state = {
      data: [],
      contactUsers: new Set()
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
            <button onClick={this.fetchCalendar} style={{ display: "inline-block", position: "absolute", right: "300px" }}>
              Trace
            </button>
            <button onClick={this.signOut} style={{ display: "inline-block", position: "absolute", right: "30px" }}>
              Sign Out
            </button>
          </div>
          <div className='calendar' style={{ position: "absolute", left: "0px", width: "80%", height: "90%", overflow: 'hidden' }}>
            <Calendar events={this.state.data}/>
          </div>
          <div className='users' style={{ position: "absolute", right: "0px", width: "20%", height: "90%", overflow: 'hidden' }}>
            <UsersList users={Array.from(this.state.contactUsers)}/>
          </div>
        </div>
      );
    }
  }

  fetchCalendar() {
    const debug = true;
    const endpoint = debug ? "http://localhost:8080/getCalendar" :  "https://us-central1-poetic-tube-331012.cloudfunctions.net/getCalendar"

    const AuthProvider: AuthProviderContext = this.context
    const tokenObj = AuthProvider.getUser()?.tokenObj

    const requestBody = {
      id_token: JSON.stringify(tokenObj)
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(
        async (resp) => {
          try {
            const rawData: any[] = await resp.json()
            const data = rawData.map(event => {
              event.date = new Date(event.date)
  
              return event as EventModel
            })
  
            console.log(data)

            const pushUsers = new Set<IndividualModel>()
            data.forEach(event => {
              if (event.inPerson) {
                event.attendees.forEach(user => pushUsers.add(user))
              }
            })

            this.setState({
              contactUsers: pushUsers,
              data: data
            })
          } catch (error) {
            console.error("Could not fetch calendar", error)
          }
        },
        (reason) => {
          console.error(reason)
        }
      )
  } 

  componentDidMount() {
    this.fetchCalendar()
  }
    
}

export default withRouter(Home)
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Calendar } from "./calendar";

class Home extends React.Component<RouteComponentProps> {
  signOut() {
    console.log("Signing out")

    const path = "/"
    this.props.history.push(path)
  }

  constructor(props: any) {
    super(props)

    this.signOut = this.signOut.bind(this)
  }

  render() {
    return (
      <div className="Page">
        <div style={{ height: "10%", display: "flex", alignItems: "center", textAlign: "center" }}>
          <h1 style={{ display: "inline-block" }}>Rapid Contact Tracer</h1>
          <button onClick={this.signOut} style={{ display: "inline-block", position: "absolute", right: "30px" }}>
            Contact Trace
          </button>
        </div>
        <div className='calendar' style={{ width: "80%", height: "90%", overflow: 'hidden' }}>
          <Calendar />
        </div>
      </div>
    );
  }
}

export default withRouter(Home)
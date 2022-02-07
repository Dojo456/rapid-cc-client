import React from "react";
import { EventModel } from "./models";

interface DateProps {
    date: Date,
    events: EventModel[]
}

export class CalendarDate extends React.Component<DateProps> {
    render() {
        const date = this.props.date

        const today: boolean = date.toDateString() === new Date().toDateString()
        const backgroundColor = today ? "lightyellow" : "white"

        return (
            <div style={{ overflow:"hidden", width:"100%", height:"100%", backgroundColor:backgroundColor }}>
                <p style={{ margin:"0", height:"35%" }}>{date.toLocaleString('default', { month: 'long', day: 'numeric' })}</p>
                <ul style={{overflow:"auto", height:"65%", listStyle:"none", padding:0, margin:0 }}>
                    {this.props.events.map((event) => {
                        const color = event.inPerson ? "lightcoral" : "lightblue"
                        return (        
                        <li key={event.eventID} style={{backgroundColor: color, marginBottom:"5px"}}>
                            {event.label}
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
}
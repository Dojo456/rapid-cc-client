import React from "react";
import { CalendarEvent } from "../models/event";

interface DateProps {
    date: Date,
    events: CalendarEvent[]
}

export class CalendarDate extends React.Component<DateProps> {
    render() {
        const date = this.props.date

        return (
            <div style={{ overflow:"hidden", width:"100%", height:"100%" }}>
                <p style={{ margin:"0", height:"35%" }}>{date.toLocaleString('default', { month: 'long', day: 'numeric' })}</p>
                <ul style={{overflow:"auto", height:"65%", listStyle:"none", padding:0, margin:0 }}>
                    {this.props.events.map((event) => {
                        const color = event.date.getDate() === new Date().getDate() ? "lightcoral" : "lightblue"
                        return (
                        <li style={{backgroundColor: color}}>
                            {event.label}
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
}
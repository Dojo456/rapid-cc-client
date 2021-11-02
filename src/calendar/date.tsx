import React from "react";
import { CalendarEvent } from "../models/event";

interface DateProps {
    date: Date,
    events: CalendarEvent[]
}

export class CalendarDate extends React.Component<DateProps> {
    render() {
        return (
            <div>
                <h1>{this.props.date.getDay()}</h1>
                <ul>
                    {this.props.events.map((event) => {
                        const color = event.inPerson ? "lightcoral" : "lightblue"
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
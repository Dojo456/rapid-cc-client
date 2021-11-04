import React from "react";
import { CalendarEvent } from "../models/event";

interface DateProps {
    date: Date,
}

interface DateState {
    events: CalendarEvent[]
}

export class CalendarDate extends React.Component<DateProps, DateState> {
    constructor(props: DateProps) {
        super(props);

        this.state = {
            events: []
        }
    }

    render() {
        return (
            <div style={{ overflow:"hidden", width:"100%", height:"100%" }}>
                <p style={{ margin:"0", height:"35%" }}>{this.props.date.getDate()}</p>
                <ul style={{overflow:"auto", height:"65%", listStyle:"none", padding:0, margin:0 }}>
                    {this.state.events.map((event) => {
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
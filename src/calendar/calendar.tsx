import React, { CSSProperties } from "react"
import { CalendarEvent } from "../models/event";
import { CalendarDate } from "./date";

const calendarDayStyle: CSSProperties = {
    width: "calc(100% / 7)",
    backgroundColor: "white",
    display: "inline-block"
}

export class Calendar extends React.Component {
    render() {
        return (
        <div>
            <div>
                <b style = {calendarDayStyle}>Su</b>
                <b style = {calendarDayStyle}>Mo</b>
                <b style = {calendarDayStyle}>Tu</b>
                <b style = {calendarDayStyle}>We</b>
                <b style = {calendarDayStyle}>Th</b>
                <b style = {calendarDayStyle}>Fr</b>
                <b style = {calendarDayStyle}>Sa</b>
            </div>
            <div>
                {monthDays()}
            </div>
        </div>
        );
    }
}

function monthDays() {
    const days = []

    for (let i = 0; i < 30; i++) {
        days.push( 
        <b style={calendarDayStyle}>
            <CalendarDate date = {new Date()} events = {[{label: "new event", attendees: [], inPerson: true}]}/>
        </b>)
    }

    return days;
}
import React, { CSSProperties } from "react"
import { CalendarEvent } from "../models/event";
import { CalendarDate } from "./date";

const calendarDayWeekStyle: CSSProperties = {
    width: "calc(100% / 7)",
    height: "minimize-content",
    backgroundColor: "white",
    display: "inline-block"
}

export class Calendar extends React.Component {
    render() {
        return (
        <div style={{ width: "100%", height: "100%", backgroundColor:"lightgray", overflow: "hidden" }}>
            {renderCalenderDays()}
        </div>
        );
    }
}

function renderCalenderDays() {
    const events: { [index:number] : CalendarEvent[] } = {
        11: [{
            label: "yeah",
            attendees: [],
            inPerson: true
        }]
    }

    const date = new Date();
    const daysPrevMonth = getLeadingDays(date);
    const daysThisMonth = getMonthDays(date);
    const daysNextMonth = getTrailingDays(date, daysPrevMonth, daysThisMonth);

    const allDays = daysPrevMonth.concat(daysThisMonth).concat(daysNextMonth);

    const weeks: JSX.Element[] = [];

    for (let i = 0; i < 5; i++) {
        const weekDays: JSX.Element[] = []

        for (let j = 0; j < 7; j++) {
            const index = (i * 7) + j;

            weekDays.push(
                <td style={{ backgroundColor:"white" }}>
                    <CalendarDate date={allDays[index]} events={[]}></CalendarDate>
                </td>
            )
        }

        weeks.push(
            <tr>
                {weekDays}
            </tr>
        )
    }

    return (
        <table style={{ width:"95%", height:"95%", tableLayout:"fixed", margin:"auto" }}>
            <tr>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
            </tr>
            {weeks}
        </table>
    );
}

function getLeadingDays(date: Date, staDay = 0) { // 0: sunday
    const ret = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const days = (firstWeekday + 7) - (staDay +7) - 1;
    for (let i = days * -1; i <= 0; i++) {
        ret.push(new Date(year, month, i));
    }
    return ret;
}

function getMonthDays(date: Date) {
    const ret = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month+1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) ret.push(new Date(year, month, i));
    return ret;
}

function getTrailingDays(date: Date, leadingDays: Date[], monthDays: Date[]) {
    const ret = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = 42 - (leadingDays.length + monthDays.length);
    for (let i = 1; i <= days; i++) ret.push(new Date(year, month, i));
    return ret;
}
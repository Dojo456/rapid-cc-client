import React, { CSSProperties } from "react"
import { EventModel } from "./models";
import { CalendarDate } from "./date";

interface CalendarProps {
    events: EventModel[]
}

export class Calendar extends React.Component<CalendarProps> {
    render() {
        return (
        <div style={{ width: "100%", height: "100%", backgroundColor:"lightgray", overflow: "hidden" }}>
            {renderCalenderDays(this.props.events)}
        </div>
        );
    }
}

function renderCalenderDays(events: EventModel[]) {
    const today = new Date();
    const daysPrevMonth = getLeadingDays(today);
    const daysThisMonth = getMonthDays(today);
    const daysNextMonth = getTrailingDays(today, daysPrevMonth, daysThisMonth);

    const allDays = daysPrevMonth.concat(daysThisMonth).concat(daysNextMonth);

    const weeks: JSX.Element[] = [];

    function getDateIndex(date: Date): string {
        return `Month:${date.getUTCMonth()}Day:${date.getUTCDate()}`
    }

    const eventMap: {[index:string] : EventModel[]} = {}
    events.forEach(event => {
        const index = getDateIndex(event.date)
        const dayEvents = eventMap[index]

        if (!dayEvents) {
            eventMap[index] = [event]
        }
        else {
            dayEvents.push(event)
        }
    })

    function getDayEvents(date: Date): EventModel[] {
        const index = getDateIndex(date)
        const dayEvents = eventMap[index]

        if (!dayEvents) {
            return []
        }
        else {
            return dayEvents
        }
    }

    for (let i = 0; i < 5; i++) {
        const weekDays: JSX.Element[] = []

        for (let j = 0; j < 7; j++) {
            const index = (i * 7) + j;
            const day = allDays[index];
            const dayEvents = getDayEvents(day)

            weekDays.push(
                <td key={j} style={{ backgroundColor:"white" }}>
                    <CalendarDate date={day} events={dayEvents}></CalendarDate>
                </td>
            )
        }

        weeks.push(
            <tr key={i} style={{ height:"19%" }}>
                {weekDays}
            </tr>
        )
    }

    const weekDayStyle: CSSProperties = {
        overflow: "hidden"
    }

    return (
        <table style={{ width:"95%", height:"95%", tableLayout:"fixed", margin:"auto" }}>
            <thead>
                <tr style={{ height:"5%" }}>
                    <th style={weekDayStyle}>Sunday</th>
                    <th style={weekDayStyle}>Monday</th>
                    <th style={weekDayStyle}>Tuesday</th>
                    <th style={weekDayStyle}>Wednesday</th>
                    <th style={weekDayStyle}>Thursday</th>
                    <th style={weekDayStyle}>Friday</th>
                    <th style={weekDayStyle}>Saturday</th>
                </tr>
            </thead>
            <tbody>
                {weeks}
            </tbody>
        </table>
    );
}

// Following three functions are taken from https://medium.com/allenhwkim/how-to-build-a-calendar-widget-7cf397fe3de5
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
    const month = date.getMonth() + 1;
    const days = 35 - (leadingDays.length + monthDays.length);
    for (let i = 1; i <= days; i++) ret.push(new Date(year, month, i));
    return ret;
}
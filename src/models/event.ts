import { Individual } from "./individual";

export type CalendarEvent = {
    label: string,
    attendees: Individual[],
    date: Date
}
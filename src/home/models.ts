export type IndividualModel = {
    name: string,
    email: string
}

export type EventModel = {
    label: string,
    inPerson?: boolean,
    attendees: IndividualModel[],
    eventID: string;
    date: Date
}
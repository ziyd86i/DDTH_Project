import { Injectable } from "@angular/core";

export class Appointment {
    text: string;
    em_id: number[];
    startDate: Date;
    endDate: Date;
    allDay?: boolean;
    recurrenceRule?: string;
}

export class Resource {
    text: string;
    id: number;
    color: string;
}

let appointments: Appointment[] = [
    {
        text: "Website Re-Design Plan",
        em_id: [4],
        startDate: new Date('2017-09-25 10:00:00'),
        endDate: new Date('2017-09-25 15:00:00')
    }, {
        text: "Book Flights to San Fran for Sales Trip",
        em_id: [2],
        startDate: new Date(2015, 4, 25, 12, 0),
        endDate: new Date(2015, 4, 25, 13, 0),
        allDay: true
    }, {
        text: "Install New Router in Dev Room",
        em_id: [1],
        startDate: new Date(2015, 4, 25, 14, 30),
        endDate: new Date(2015, 4, 25, 15, 30)
    }, {
        text: "Approve Personal Computer Upgrade Plan",
        em_id: [3],
        startDate: new Date(2015, 4, 26, 10, 0),
        endDate: new Date(2015, 4, 26, 11, 0)
    }, {
        text: "Final Budget Review",
        em_id: [1],
        startDate: new Date(2015, 4, 26, 12, 0),
        endDate: new Date(2015, 4, 26, 13, 35)
    }, {
        text: "New Brochures",
        em_id: [4],
        startDate: new Date(2015, 4, 26, 14, 30),
        endDate: new Date(2015, 4, 26, 15, 45)
    }, {
        text: "Install New Database",
        em_id: [2],
        startDate: new Date(2015, 4, 27, 9, 45),
        endDate: new Date(2015, 4, 27, 11, 15)
    }, {
        text: "Approve New Online Marketing Strategy",
        em_id: [3, 4],
        startDate: new Date(2015, 4, 27, 12, 0),
        endDate: new Date(2015, 4, 27, 14, 0)
    }, {
        text: "Upgrade Personal Computers",
        em_id: [2],
        startDate: new Date(2015, 4, 27, 15, 15),
        endDate: new Date(2015, 4, 27, 16, 30)
    }, {
        text: "Customer Workshop",
        em_id: [3],
        startDate: new Date(2015, 4, 28, 11, 0),
        endDate: new Date(2015, 4, 28, 12, 0),
        allDay: true
    }, {
        text: "Prepare 2015 Marketing Plan",
        em_id: [1, 3],
        startDate: new Date(2015, 4, 28, 11, 0),
        endDate: new Date(2015, 4, 28, 13, 30)
    }, {
        text: "Brochure Design Review",
        em_id: [4],
        startDate: new Date(2015, 4, 28, 14, 0),
        endDate: new Date(2015, 4, 28, 15, 30)
    }, {
        text: "Create Icons for Website",
        em_id: [3],
        startDate: new Date(2015, 4, 29, 10, 0),
        endDate: new Date(2015, 4, 29, 11, 30)
    }, {
        text: "Upgrade Server Hardware",
        em_id: [4],
        startDate: new Date(2015, 4, 29, 14, 30),
        endDate: new Date(2015, 4, 29, 16, 0)
    }, {
        text: "Submit New Website Design",
        em_id: [1],
        startDate: new Date(2015, 4, 29, 16, 30),
        endDate: new Date(2015, 4, 29, 18, 0)
    }, {
        text: "Launch New Website",
        em_id: [2],
        startDate: new Date(2015, 4, 29, 12, 20),
        endDate: new Date(2015, 4, 29, 14, 0)
    }, {
        text: "Stand-up meeting",
        em_id: [1, 2, 3, 4],
        startDate: new Date(2015, 4, 25, 9, 0),
        endDate: new Date(2015, 4, 25, 9, 15),
        recurrenceRule: "FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR;UNTIL=20150530"
    }
];

let resources: Resource[] = [
    {
        text: "Samantha Bright",
        id: 1,
        color: "#cb6bb2"
    }, {
        text: "John Heart",
        id: 2,
        color: "#56ca85"
    }, {
        text: "Todd Hoffman",
        id: 3,
        color: "#1e90ff"
    }, {
        text: "Sandra Johnson",
        id: 4,
        color: "#ff9747"
    }
];

@Injectable()
export class Service {
    getAppointments(): Appointment[] {
        return appointments;
    }
    getResources(): Resource[] {
        return resources;
    }
}

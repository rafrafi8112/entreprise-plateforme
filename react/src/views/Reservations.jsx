import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { gapi } from "gapi-script";

export default function Reservations() {
    var CLIENT_ID = "36930002908-v0vrk0ekcmt4g6op5ptn88bh5pat3c2u.apps.googleusercontent.com"
    var API_KEY = "AIzaSyC8C1H6n8YBaglVgtvBu0c6nSAYHRNNkj8"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setNotification } = useStateContext();
    const navigate = useNavigate(); // Use navigate for programmatically changing routes

    useEffect(() => {
        getReservations();
        console.log("les reservation sont",)
    }, []);

    const getReservations = () => {
        setLoading(true);
        axiosClient.get('/reservations')
            .then(({ data }) => {
                setLoading(false);
                setReservations(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDeleteClick = (reservationId) => {
        console.log("la reservation id est",reservationId)
        const reservationIdInt = parseInt(reservationId, 10); // Convert to integer if necessary
        const reservation = reservations.find(r => r.id === reservationIdInt);
        console.log("la reservation est",reservation)
        if (reservation && window.confirm("Are you sure you want to delete this reservation?")) {
            // First, attempt to delete from Google Calendar
            const googleCalendarEventId = reservation.google_calendar_event_id;
            if (googleCalendarEventId) {
                gapi.load('client:auth2', () => {
                    gapi.client.init({
                        apiKey: API_KEY,
                        clientId: CLIENT_ID,
                        discoveryDocs: DISCOVERY_DOCS,
                        scope: SCOPES,
                    }).then(() => {
                        return gapi.client.load('calendar', 'v3');
                    }).then(() => {
                        return gapi.auth2.getAuthInstance().signIn();
                    }).then(() => {
                        return gapi.client.calendar.events.delete({
                            'calendarId': 'primary',
                            'eventId': googleCalendarEventId,
                        });
                    }).then(() => {
                        console.log('Event deleted from Google Calendar');
                        // Now delete the reservation from the database
                        axiosClient.delete(`/reservations/${reservationId}`)
                            .then(() => {
                                setNotification('Reservation was successfully deleted from both Google Calendar and database');
                                getReservations(); // Refresh the list of reservations
                            }).catch((error) => {
                                console.error('Error deleting reservation from database:', error);
                            });
                    }).catch((error) => {
                        console.error('Error deleting event from Google Calendar:', error);
                    });
                });
            } else {
                console.error('Google Calendar event ID not found for reservation');
            }
        }
    };

    // Convert reservations to events for FullCalendar
    const calendarEvents = reservations.map(reservation => ({
        id: reservation.id,
        title: reservation.name,
        start: reservation.start_time,
        end: reservation.end_timen
   
    }));

    // Handle event click
    const handleEventClick = ({ event }) => {
        const reservationId = event.id;
        const confirmation = window.confirm("Do you want to modify or delete this reservation? Click OK to delete.");

        if (confirmation) {
            onDeleteClick(reservationId);
        } else {
            // Navigate to edit page, if you prefer editing over immediate deletion
            navigate(`/reservations/${reservationId}`);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ color: 'navy', fontSize: '36px', textAlign: 'center', margin: '20px 0', fontFamily: 'Arial, sans-serif' }}>
  CALENDAR
</h1>
                <Link className="btn-add" to="/reservations/new">Add new</Link>
            </div>
            <div className="calendar-view">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={calendarEvents}
                    eventClick={handleEventClick} // Add eventClick here
                />
            </div>
        </div>
    );
}

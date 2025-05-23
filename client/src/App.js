import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect} from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format  from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function App() {

  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    console.log('Fetching availability...');
    fetch('/api/availability')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched slots:', data);
        const parsed = data.map(slot => ({
          id: slot.id,
          start: new Date(slot.start),
          end: new Date(slot.end),
          title: slot.title || 'Available',
        }));
        console.log('Parsed events:', parsed);
        setEvents(parsed);
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <div style={{ padding: 20}}>
      <h1>Tutoring Schedule</h1>
      <pre style={{ background: '#f0f0f0', padding: 10 }}>
      {JSON.stringify(events, null, 2)}
    </pre>
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultDate={new Date(2025, 4, 23)}
      style={{ height: 600, marginTop: 20}}
      />
    </div>
  );
}
// src/components/booking/BookingCalendar.jsx
import React, { useState } from 'react';
import TimeSlots from './TimeSlots';

const BookingCalendar = ({ consultant }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Calendar Section */}
      <div className="flex-1 border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
        <p className="text-gray-500">Calendar coming soon...</p>
      </div>

      {/* Time Slots Section */}
      <div className="flex-1 border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Available Times</h2>
        {selectedDate ? (
          <TimeSlots date={selectedDate} consultant={consultant} />
        ) : (
          <p className="text-gray-500">Select a date to view available times</p>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
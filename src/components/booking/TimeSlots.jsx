// src/components/booking/TimeSlots.jsx
import React from 'react';

const TimeSlots = ({ date, consultant }) => {
  // Placeholder time slots
  const slots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {slots.map((time) => (
        <button
          key={time}
          className="p-2 text-sm border rounded-md hover:bg-gray-50"
          onClick={() => console.log(`Selected: ${time}`)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlots;
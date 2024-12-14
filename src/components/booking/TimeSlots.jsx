import React, { useState } from 'react';
import BookingForm from './BookingForm';

const TimeSlots = ({ date, consultant }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const slots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const getTimeRange = (startTime) => {
    const [time, period] = startTime.split(' ');
    const [hours, minutes] = time.split(':');
    let endHours = parseInt(hours);
    let endMinutes = parseInt(minutes) + 30;
    let endPeriod = period;

    if (endMinutes >= 60) {
      endMinutes = 0;
      endHours += 1;
      if (endHours === 12 && period === 'AM') {
        endPeriod = 'PM';
      } else if (endHours === 12 && period === 'PM') {
        endPeriod = 'AM';
      }
    }
    if (endHours > 12) {
      endHours = 1;
    }

    return `${startTime} - ${endHours}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };


  const handleContinueBooking = () => {
    setShowBookingForm(true);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((time) => (
          <button
            key={time}
            className={`p-3 text-sm border rounded-md transition-colors
              ${selectedTime === time 
                ? 'border-gray-900 bg-gray-50' 
                : 'hover:bg-gray-50'
              }`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>

      {selectedTime && (
        <div className="mt-6 p-4 border-t">
          <p className="font-medium">Selected Time: {getTimeRange(selectedTime)}</p>
          <p className="text-sm text-gray-600 mt-1">
            {formatDate(date)} with <span className="font-semibold text-gray-900">{consultant}</span>
          </p>
          <button 
            className="mt-4 w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
            onClick={handleContinueBooking}
          >
            Continue Booking
          </button>
        </div>
      )}

      {showBookingForm && (
        <BookingForm
          date={formatDate(date)}
          time={getTimeRange(selectedTime)}
          consultant={consultant}
          onCancel={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default TimeSlots;
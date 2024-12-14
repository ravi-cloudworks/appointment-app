import React, { useState } from 'react';
import TimeSlots from './TimeSlots';

const BookingCalendar = ({ consultant }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Previous functions remain same: getDaysInMonth, nextMonth, prevMonth
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const getDayClasses = (date) => {
    if (!date) return 'text-gray-300';
    
    let classes = 'relative flex items-center justify-center w-10 h-10 mx-auto';
    
    if (isPast(date)) {
      classes += ' text-gray-300 cursor-not-allowed';
    } else {
      classes += ' hover:bg-gray-50 cursor-pointer';
    }

    if (isSelected(date)) {
      // Circle outline when selected
      classes += ' ring-2 ring-gray-900 rounded-full';
    }
    
    if (isToday(date)) {
      classes += ' font-bold after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-gray-600 after:rounded-full';
    }

    return classes;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Calendar Section */}
      <div className="flex-1 border rounded-lg p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <button 
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>
        </div>

        {/* Week days header */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm text-gray-600 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days.map((date, index) => (
            <div
              key={index}
              className={getDayClasses(date)}
              onClick={() => date && !isPast(date) && setSelectedDate(date)}
            >
              {date ? date.getDate() : ''}
            </div>
          ))}
        </div>
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
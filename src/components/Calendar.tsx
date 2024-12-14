import React, { useState } from 'react';
import "./ui/Calendar.css";

interface CalendarProps {
    onDateSelect: (date: Date) => void;
    className?: string; // Allow additional classes to be passed in
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, className }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const generateCalendar = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDay = startOfMonth.getDay() === 0 ? 7 : startOfMonth.getDay(); // Adjust to start from Monday
        const daysInMonth = endOfMonth.getDate();

        // Calculate previous month's days
        const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        const daysInPrevMonth = prevMonthEnd.getDate();

        const calendarDays: JSX.Element[] = [];

        // Add days from the previous month
        for (let i = startDay - 2; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            calendarDays.push(
                <div className="day prev-month" key={`prev-${day}`}>{day}</div>
            );
        }

        // Add days for the current month
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(
                <div
                    key={i}
                    className={`day ${
                        selectedDate?.getDate() === i && selectedDate?.getMonth() === currentDate.getMonth()
                            ? 'selected'
                            : ''
                    }`}
                    onClick={() => {
                        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                        setSelectedDate(selected);
                        onDateSelect?.(selected); // Trigger the callback if provided
                    }}
                >
                    {i}
                </div>
            );
        }

        // Fill remaining spaces with next month's days
        const remainingDays = (7 - (calendarDays.length % 7)) % 7;
        for (let i = 1; i <= remainingDays; i++) {
            calendarDays.push(
                <div className="day next-month" key={`next-${i}`}>{i}</div>
            );
        }

        return calendarDays;
    };

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className={`calendar-component ${className}`}>
            <div className="calendar-header">
                <button onClick={handlePreviousMonth}>&lt;</button>
                <div className="month-label">
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </div>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>

            <div className="days-of-week">
                {daysOfWeek.map((day, index) => (
                    <div className="day-of-week" key={index}>{day}</div>
                ))}
            </div>

            <div className="calendar-grid">{generateCalendar()}</div>
        </div>
    );
};

export default Calendar;

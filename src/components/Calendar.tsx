// import { Slot } from "@radix-ui/react-slot";
// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/lib/utils";
import React, { useState } from 'react';
import "./ui/Calendar.css";


interface CalendarProps {
    onDateSelect: (date: Date) => void;
    className?: string; // Add this line to allow className to be passed in
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect , className }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const generateCalendar = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDay = startOfMonth.getDay() === 0 ? 7 : startOfMonth.getDay();
        const daysInMonth = endOfMonth.getDate();

        const calendarDays: JSX.Element[] = [];

        for (let i = 1 - (startDay - 1); i <= daysInMonth; i++) {
            if (i < 1) {
                calendarDays.push(<div className="empty" key={`empty-${i}`}></div>);
            } else {
                calendarDays.push(
                    <div
                        key={i}
                        className={`day ${selectedDate?.getDate() === i ? 'selected' : ''}`}
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
        <div className={ `calendar-component ${className}`}>

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
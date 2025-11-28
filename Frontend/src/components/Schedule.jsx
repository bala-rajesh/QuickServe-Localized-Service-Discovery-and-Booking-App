import React from 'react';
import { useRecoilValue } from 'recoil';
import { upcomingBookingsSelector } from '../state/selectors';

const Schedule = () => {
    const upcomingBookings = useRecoilValue(upcomingBookingsSelector);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
        const day = date.getDate();
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { month, day, time };
    }

    return (
        <div>
            <h2 className="text-xl font-bold pb-3">You Next 7 days</h2>
            <div className="rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark p-6 flex flex-col gap-4">
                {upcomingBookings.length > 0 ? (
                    upcomingBookings.map(booking => {
                        const { month, day, time } = formatDate(booking.datetime);
                        return (
                            <div key={booking.id} className="flex items-center gap-4">
                                <div className="flex flex-col items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20 p-2 w-14">
                                    <span className="text-xs font-bold uppercase text-primary">{month}</span>
                                    <span className="text-xl font-bold text-primary">{day}</span>
                                </div>
                                <div>
                                    <p className="font-medium">{booking.service}</p>
                                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">{time} - {booking.customer}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">No upcoming bookings for this week.</p>
                )}
                <button className="mt-2 w-full flex items-center justify-center h-10 rounded-lg bg-background-light dark:bg-background-dark text-sm font-medium hover:bg-primary/10 dark:hover:bg-primary/20">View Full Calendar</button>
            </div>
        </div>
    );
};

export default Schedule;

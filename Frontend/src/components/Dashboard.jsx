// src/components/Dashboard.jsx

import React, { useState } from 'react'; 
import BookingTabs from './BookingTabs';
import SearchFilters from './SearchFilters';
import BookingCard from './BookingCard';
import providerJane from '../assets/images/provider_jane.png'; 
import providerImage from '../assets/images/user_alex.png';
import Acme from '../assets/images/Acme.png';
const SAMPLE_BOOKINGS = [
    {
        id: 1,
        providerName: "Jane's Cleaning Co.",
        serviceType: "Deep House Cleaning",
        date: "Oct 25, 2023",
        time: "2:00 PM - 4:00 PM",
        status: "Confirmed",
        statusColor: "#00c853",
        image: providerJane, 
        isUpcoming: true,
    },
    {
        id: 2,
        providerName: "Plumb Perfect",
        serviceType: "Leaky Faucet Repair",
        date: "Oct 28, 2023",
        time: "10:00 AM - 11:00 AM",
        status: "In Progress",
        statusColor: "#ffc107",
        image: providerImage,
        isUpcoming: true,
    },
    {
        id: 3,
        providerName: "Acme Electric",
        serviceType: "Outlet Installation",
        date: "Sep 01, 2023",
        time: "9:00 AM - 10:00 AM",
        status: "Completed",
        statusColor: "#6c757d",
        image: Acme,
        isUpcoming: false,
    },
];


function Dashboard({ className }) {
    const [bookings, setBookings] = useState(SAMPLE_BOOKINGS); 
    const [activeTab, setActiveTab] = useState('upcoming'); 

    const filteredBookings = bookings.filter(booking => {
        return activeTab === 'upcoming' ? booking.isUpcoming : !booking.isUpcoming;
    });

    return (
        <main className={className}>
            
            <h1 style={{ marginBottom: '30px', fontSize: '2.5rem', fontWeight: 600, color: '#333' }}>
                Welcome back, Alex!
            </h1>

            <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} /> 
            
            <div style={{ padding: '20px 0' }}>
                <SearchFilters /> 
            </div>

            <div className="booking-list" style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', marginTop: '30px' }}>
                
                {filteredBookings.map(booking => (
                    <BookingCard
                        key={booking.id} 
                        providerName={booking.providerName}
                        serviceType={booking.serviceType}
                        date={booking.date}
                        time={booking.time}
                        status={booking.status}
                        statusColor={booking.statusColor}
                        providerImage={booking.image}
                    />
                ))}

                {filteredBookings.length === 0 && (
                    <div style={{ 
                        width: '100%', 
                        border: '2px dashed #ccc', 
                        borderRadius: '10px', 
                        padding: '50px', 
                        textAlign: 'center', 
                        marginTop: '20px', 
                        backgroundColor: 'white' 
                    }}>
                        <span style={{ fontSize: '40px' }}>✨</span>
                        <h3 style={{ margin: '10px 0' }}>No {activeTab} Bookings</h3>
                        <p style={{ margin: '5px 0 20px', color: '#666' }}>When you book a service, it will appear here.</p>
                        <button style={{ 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            padding: '10px 30px', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                        }}>
                            Find a Service
                        </button>
                    </div>
                )}
                
            </div>

        </main>
    );
}

export default Dashboard;
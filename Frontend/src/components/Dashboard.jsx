// src/components/Dashboard.jsx
import React, { useState } from 'react'; 
import BookingTabs from './BookingTabs';
import SearchFilters from './SearchFilters';
import BookingCard from './BookingCard';

import providerJane from '../assets/images/provider_jane.png'; 
import providerImage from '../assets/images/user_alex.png';
import Acme from '../assets/images/Acme.png';

const SAMPLE_BOOKINGS = [
    { id: 1, providerName: "Jane's Cleaning Co.", serviceType: "Deep House Cleaning", date: "Oct 25, 2023", time: "2:00 PM - 4:00 PM", status: "Booked", statusColor: "#00c853", image: providerJane },
    { id: 2, providerName: "Plumb Perfect", serviceType: "Leaky Faucet Repair", date: "Oct 28, 2023", time: "10:00 AM - 11:00 AM", status: "In Progress", statusColor: "#ffc107", image: providerImage },
    { id: 3, providerName: "Acme Electric", serviceType: "Outlet Installation", date: "Sep 01, 2023", time: "9:00 AM - 10:00 AM", status: "Cancelled", statusColor: "#f44336", image: Acme },
    { id: 4, providerName: "Quick Fix", serviceType: "Painting", date: "Sep 05, 2023", time: "1:00 PM - 3:00 PM", status: "Rejected", statusColor: "#6c757d", image: providerJane },
    { id: 5, providerName: "Sparky Repairs", serviceType: "Wiring Check", date: "Nov 02, 2023", time: "11:00 AM - 12:00 PM", status: "Booked", statusColor: "#00c853", image: Acme },
    { id: 6, providerName: "Garden Masters", serviceType: "Lawn Mowing", date: "Oct 30, 2023", time: "08:00 AM - 09:30 AM", status: "In Progress", statusColor: "#ffc107", image: providerImage },
    { id: 7, providerName: "Flow Dynamics", serviceType: "Pipe Insulation", date: "Nov 10, 2023", time: "10:00 AM - 11:30 AM", status: "Booked", statusColor: "#00c853", image: providerImage }
];

function Dashboard({ className }) {
    // State for Tabs
    const [activeTab, setActiveTab] = useState('All'); 
    
    // State for Search and Dropdown filters
    const [searchFilters, setSearchFilters] = useState({
        searchTerm: '',
        serviceType: '',
        dateRange: ''
    });

    // Function to update individual filter values
    const handleFilterUpdate = (key, value) => {
        setSearchFilters(prev => ({ ...prev, [key]: value }));
    };

    // --- The Filtering Engine ---
    const filteredBookings = SAMPLE_BOOKINGS.filter(booking => {
        // 1. Filter by Status (Tabs)
        const matchesTab = activeTab === 'All' || booking.status === activeTab;
        
        // 2. Filter by Search Text (Provider Name or Service Type)
        const matchesSearch = booking.providerName.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) || 
                             booking.serviceType.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());
        
        // 3. Filter by Service Type Dropdown
        const matchesServiceType = searchFilters.serviceType === '' || 
                                  booking.serviceType.toLowerCase().includes(searchFilters.serviceType.toLowerCase());

        // 4. Filter by Date Range Dropdown (Example logic checking the month)
        let matchesDate = true;
        if (searchFilters.dateRange === 'Today') {
            // Mock logic: assuming current date is Oct 25
            matchesDate = booking.date.includes("Oct 25");
        } else if (searchFilters.dateRange === 'ThisMonth') {
            matchesDate = booking.date.includes("Oct");
        }

        return matchesTab && matchesSearch && matchesServiceType && matchesDate;
    });

    return (
        <main className={className}>
            <h1 style={{ marginBottom: '30px', fontSize: '2.5rem', fontWeight: 600, color: '#333' }}>
                Welcome back, Alex!
            </h1>
            
            {/* Pass state and handler to Tabs */}
            <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} /> 
            
            <div style={{ padding: '20px 0' }}>
                {/* Pass state and handler to SearchFilters */}
                <SearchFilters 
                    filters={searchFilters} 
                    onFilterChange={handleFilterUpdate} 
                />
            </div>

            <div className="booking-list" style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', marginTop: '30px' }}>
                {filteredBookings.map(booking => (
                    <BookingCard key={booking.id} {...booking} providerImage={booking.image} />
                ))}
                
                {filteredBookings.length === 0 && (
                    <div style={{ width: '100%', border: '2px dashed #ccc', borderRadius: '10px', padding: '50px', textAlign: 'center', backgroundColor: 'white' }}>
                        <h3>No matching bookings found for "{activeTab}" with current filters.</h3>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Dashboard;
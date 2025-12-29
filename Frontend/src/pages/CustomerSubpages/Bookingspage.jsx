import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard'; 
import Summary from '../../components/Summary'; 
import BookingForm from '../../components/BookingForm';


function CustomerBookingsPage() {
    const [currentView, setCurrentView] = useState('dashboard');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rescheduleData, setRescheduleData] = useState(null);
    
    // Filter states lifted from Dashboard
    const [activeTab, setActiveTab] = useState('All');
    const [searchFilters, setSearchFilters] = useState({ searchTerm: '', serviceType: '', dateRange: '' });
    const [stats, setStats] = useState({ totalBooked: 0, thisWeek: 0 });

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                status: activeTab,
                query: searchFilters.searchTerm,
                serviceType: searchFilters.serviceType
            });
            const response = await fetch(`http://localhost:8080/api/customer/bookings?${queryParams}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else {
                console.error("Failed to fetch bookings:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/customer/booking-stats', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [activeTab, searchFilters.searchTerm, searchFilters.serviceType]);

    useEffect(() => {
        fetchStats();
    }, []);

    const handleFilterUpdate = (key, value) => {
        setSearchFilters(prev => ({ ...prev, [key]: value }));
    };

    const switchToDashboard = () => {
        setCurrentView('dashboard');
        setRescheduleData(null);
    };

    const switchToBooking = () => {
        setRescheduleData(null);
        setCurrentView('booking');
    };

    const handleRescheduleStart = (booking) => {
        setRescheduleData(booking);
        setCurrentView('booking');
    };

    const handleRescheduleSubmit = async (formData) => {
        if (!rescheduleData) return;
        
        const payload = {
            ...formData,
            serviceTitle: formData.category
        };

        try {
            const response = await fetch(`http://localhost:8080/api/customer/book/${rescheduleData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Booking rescheduled successfully!");
                switchToDashboard();
                fetchBookings(); // Refresh list
                fetchStats(); // Refresh stats
            } else {
                alert("Failed to reschedule booking.");
            }
        } catch (error) {
            console.error("Reschedule error:", error);
            alert("An error occurred.");
        }
    };

    return (
        <div className="w-full">
            <div style={{ width: '100%', boxSizing: 'border-box' }}>
                {currentView === 'dashboard' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <Dashboard 
                            bookings={bookings} 
                            loading={loading}
                            onRescheduleClick={handleRescheduleStart} 
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            searchFilters={searchFilters}
                            onFilterChange={handleFilterUpdate}
                        />
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px', marginBottom: '50px' }}>
                            <Summary stats={stats} />
                        </div>
                    </div>
                ) : (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <BookingForm 
                            onCancel={switchToDashboard} 
                            initialCategory={rescheduleData ? rescheduleData.serviceType : ''}
                            initialData={rescheduleData}
                            onSubmit={handleRescheduleSubmit}
                        /> 
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomerBookingsPage;
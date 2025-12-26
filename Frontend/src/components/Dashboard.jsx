import React, { useState } from 'react'; 
import BookingTabs from './BookingTabs';
import SearchFilters from './SearchFilters';
import BookingCard from './BookingCard';

// Assets
import providerJane from '../assets/images/provider_jane.png'; 
import providerImage from '../assets/images/user_alex.png';
import Acme from '../assets/images/Acme.png';

const SAMPLE_BOOKINGS = [
    { id: 1, providerName: "Jane's Cleaning Co.", serviceType: "Cleaning", date: "Oct 25, 2023", time: "2:00 PM - 4:00 PM", status: "Booked", image: providerJane, description: "Deep cleaning of 3 bedrooms and 2 bathrooms. Eco-friendly products included." },
    { id: 2, providerName: "Plumb Perfect", serviceType: "Repair", date: "Oct 28, 2023", time: "10:00 AM - 11:00 AM", status: "In Progress", image: providerImage, description: "Kitchen sink drainage repair and pipe inspection." },
    { id: 3, providerName: "Acme Electric", serviceType: "Installation", date: "Sep 01, 2023", time: "9:00 AM - 10:00 AM", status: "Cancelled", image: Acme, description: "CCTV installation for front porch." },
    { id: 4, providerName: "Quick Fix Painting", serviceType: "Painting", date: "Sep 05, 2023", time: "1:00 PM - 3:00 PM", status: "Rejected", image: providerJane, description: "Living room wall accent painting." },
    { id: 5, providerName: "Sparky Repairs", serviceType: "Electrical", date: "Nov 02, 2023", time: "11:00 AM - 12:00 PM", status: "Booked", image: Acme, description: "Full circuit breaker check and master switch replacement." },
    { id: 6, providerName: "Garden Masters", serviceType: "Landscaping", date: "Oct 30, 2023", time: "08:00 AM - 10:00 AM", status: "In Progress", image: providerImage, description: "Lawn mowing and hedge trimming." },
    { id: 7, providerName: "Elite Carpentry", serviceType: "Woodwork", date: "Nov 12, 2023", time: "1:00 PM - 5:00 PM", status: "Booked", image: providerJane, description: "Custom bookshelf assembly and wall mounting." },
    { id: 8, providerName: "Clear View Windows", serviceType: "Cleaning", date: "Oct 15, 2023", time: "09:00 AM - 11:00 AM", status: "Cancelled", image: Acme, description: "Exterior window cleaning for two-story house." },
    { id: 9, providerName: "Bolt & Nut Handyman", serviceType: "Repair", date: "Nov 05, 2023", time: "2:00 PM - 3:30 PM", status: "In Progress", image: providerImage, description: "Door hinge repair and furniture assembly." },
    { id: 10, providerName: "Pure Flow HVAC", serviceType: "Maintenance", date: "Oct 20, 2023", time: "10:00 AM - 12:00 PM", status: "Rejected", image: providerJane, description: "Annual air conditioning service and filter replacement." },
    { id: 11, providerName: "Wall Wizards", serviceType: "Painting", date: "Nov 18, 2023", time: "08:00 AM - 04:00 PM", status: "Booked", image: Acme, description: "Interior painting for entire ground floor." },
    { id: 12, providerName: "Swift Locksmith", serviceType: "Security", date: "Nov 01, 2023", time: "03:00 PM - 04:00 PM", status: "In Progress", image: providerImage, description: "Smart lock installation for the main entrance." },
    { id: 13, providerName: "Pro Scrubbers", serviceType: "Cleaning", date: "Oct 29, 2023", time: "1:00 PM - 3:00 PM", status: "Booked", image: providerJane, description: "Upholstery and sofa steam cleaning." },
    { id: 14, providerName: "Current Solution", serviceType: "Electrical", date: "Sep 15, 2023", time: "11:00 AM - 01:00 PM", status: "Cancelled", image: Acme, description: "Installation of 5 new LED ceiling lights." },
    { id: 15, providerName: "Roof Rescue", serviceType: "Repair", date: "Nov 20, 2023", time: "09:00 AM - 12:00 PM", status: "Booked", image: providerImage, description: "Tile replacement and gutter cleaning." },
    { id: 16, providerName: "Scrub-a-Dub", serviceType: "Cleaning", date: "Oct 12, 2023", time: "10:00 AM - 12:00 PM", status: "Rejected", image: providerJane, description: "Post-renovation cleanup service." },
    { id: 17, providerName: "Fix-It-Fast", serviceType: "Repair", date: "Nov 10, 2023", time: "04:00 PM - 06:00 PM", status: "In Progress", image: Acme, description: "Drywall patch and paint touch-up." },
    { id: 18, providerName: "Color Me Happy", serviceType: "Painting", date: "Dec 01, 2023", time: "08:30 AM - 11:30 AM", status: "Booked", image: providerImage, description: "Kitchen cabinet repainting." },
    { id: 19, providerName: "Bright Lights", serviceType: "Electrical", date: "Dec 05, 2023", time: "01:00 PM - 03:00 PM", status: "In Progress", image: providerJane, description: "Garden lighting setup and wiring." },
    { id: 20, providerName: "Deep Steam", serviceType: "Cleaning", date: "Dec 10, 2023", time: "09:00 AM - 12:00 PM", status: "Booked", image: providerImage, description: "Full carpet sanitization for high-traffic areas." }
];

function Dashboard() {
    const [activeTab, setActiveTab] = useState('All'); 
    const [searchFilters, setSearchFilters] = useState({ searchTerm: '', serviceType: '', dateRange: '' });
    
    // State to track which booking is opened in the "Details" view
    const [viewingBooking, setViewingBooking] = useState(null);

    const handleFilterUpdate = (key, value) => {
        setSearchFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredBookings = SAMPLE_BOOKINGS.filter(booking => {
        const matchesTab = activeTab === 'All' || booking.status === activeTab;
        const matchesSearch = booking.providerName.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) || 
                             booking.serviceType.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());
        const matchesServiceDropdown = searchFilters.serviceType === '' || booking.serviceType === searchFilters.serviceType;

        return matchesTab && matchesSearch && matchesServiceDropdown;
    });

    const handleReschedule = (booking) => {
        // This logic would ideally trigger your BookingForm.jsx
        alert(`Opening Reschedule form for ${booking.providerName}...`);
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', position: 'relative' }}>
            <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Welcome back, Alex!</h1>
                
                <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} /> 
                
                <div style={{ margin: '24px 0', width: '100%' }}>
                    <SearchFilters filters={searchFilters} onFilterChange={handleFilterUpdate} />
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '24px', 
                    width: '100%' 
                }}>
                    {filteredBookings.map(booking => (
                        <BookingCard 
                            key={booking.id} 
                            {...booking} 
                            providerImage={booking.image} 
                            onDetailsClick={() => setViewingBooking(booking)} // Logic for Details button
                            onRescheduleClick={() => handleReschedule(booking)} // Logic for Reschedule button
                        />
                    ))}
                </div>
            </div>

            {/* --- DETAILS MODAL OVERLAY --- */}
            {viewingBooking && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', 
                    alignItems: 'center', zIndex: 1000, padding: '20px'
                }}>
                    <div style={{ 
                        backgroundColor: 'white', padding: '30px', borderRadius: '16px', 
                        maxWidth: '500px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' 
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0, color: '#007bff' }}>Booking Details</h2>
                            <button onClick={() => setViewingBooking(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>
                        
                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <p><strong>Provider:</strong> {viewingBooking.providerName}</p>
                            <p><strong>Service:</strong> {viewingBooking.serviceType}</p>
                            <p><strong>Status:</strong> <span style={{ color: viewingBooking.status === 'Booked' ? 'green' : 'orange' }}>{viewingBooking.status}</span></p>
                            <p><strong>Date:</strong> {viewingBooking.date}</p>
                            <p><strong>Time:</strong> {viewingBooking.time}</p>
                            <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
                                <p style={{ margin: 0, fontWeight: '600', marginBottom: '5px' }}>Inclusions:</p>
                                <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>{viewingBooking.description}</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => setViewingBooking(null)}
                            style={{ 
                                width: '100%', marginTop: '25px', padding: '12px', 
                                backgroundColor: '#007bff', color: 'white', border: 'none', 
                                borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
                            }}
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
// src/App.jsx
import React, { useState } from 'react';
import './App.css'; 
import Header from './components/Header'; 
import Dashboard from './components/Dashboard'; 
import Summary from './components/Summary'; 
import BookingForm from './components/BookingForm'; 

function App() {
    const [currentView, setCurrentView] = useState('dashboard');
    
    const switchToDashboard = () => setCurrentView('dashboard');
    const switchToBooking = () => setCurrentView('booking');

    return (
        <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '92px' }}>
            <Header currentView={currentView} onBookServiceClick={switchToBooking} onLogoClick={switchToDashboard} /> 

            {/* THE FIX: Remove maxWidth and use width 100% */}
            <div style={{ width: '100%', padding: '0 40px', boxSizing: 'border-box' }}>
                {currentView === 'dashboard' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <Dashboard />
                        
                        {/* Summary moved to the bottom of the listings */}
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px', marginBottom: '50px' }}>
                            <Summary />
                        </div>
                    </div>
                ) : (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <BookingForm onCancel={switchToDashboard} /> 
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
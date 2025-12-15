import React, { useState } from 'react';
import './App.css'; 

// Components used in the App
// Regenerating these imports completely to resolve persistent "Could not resolve" errors
import Header from './components/Header'; 
import Dashboard from './components/Dashboard'; 
import Summary from './components/Summary'; 
import BookingForm from './components/BookingForm'; 
import FindServices from './components/FindServices';
import MessagesView from './components/MessagesView'; 


// Simple placeholder components for the remaining views
const Profile = () => (
    <div className="main-booking-area" style={{padding: '30px 40px', backgroundColor: '#f7f9fc', minHeight: 'calc(100vh - 80px)'}}>
        <h1>User Profile & Settings</h1>
        <p>Manage your account, change your password, and update preferences here.</p>
    </div>
);


function App() {
    
    // State to manage which view is visible: 
    // 'dashboard', 'booking', 'services', 'messages', 'profile'
    const [currentView, setCurrentView] = useState('dashboard');
    
    // State to hold the category selected from FindServices before navigating to BookingForm
    const [preSelectedCategory, setPreSelectedCategory] = useState(''); 

    // --- View Switching Functions ---
    
    // Switches to BookingForm, optionally setting a pre-selected category
    const switchToBooking = (categoryName = '') => { 
        setPreSelectedCategory(categoryName);
        setCurrentView('booking');
    };
    
    const switchToDashboard = () => setCurrentView('dashboard');
    const switchToServices = () => setCurrentView('services');
    const switchToMessages = () => setCurrentView('messages');
    const switchToProfile = () => setCurrentView('profile');

    // --- Conditional Rendering Logic ---
    let mainContent;

    if (currentView === 'dashboard') {
        // This structure ensures Dashboard (3/4 width) and Summary (1/4 width) stay side-by-side 
        // on large screens (lg:flex-row) and stack on smaller screens (flex-col).
        mainContent = (
            <div className="flex justify-center p-6 w-full"> 
                {/* Ensure the columns align to the top (items-start) to prevent Summary from dropping if Dashboard is short */}
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 lg:items-start">
                    <div className="lg:w-3/4">
                        {/* Dashboard content */}
                        <Dashboard className="main-content-area" />
                    </div>
                    <div className="lg:w-1/4">
                        {/* Summary sidebar content */}
                        <Summary className="summary-area" />
                    </div>
                </div>
            </div>
        );
    } else if (currentView === 'booking') {
        mainContent = (
            <div className="main-booking-area flex justify-center p-6" style={{ padding: '30px 0' }}> 
                {/* Pass the initialCategory from state down to the BookingForm */}
                <BookingForm onCancel={switchToDashboard} initialCategory={preSelectedCategory} /> 
            </div>
        );
    } else if (currentView === 'services') {
        // FindServices view
        mainContent = (
            <FindServices 
                onBookServiceClick={switchToBooking} 
                onDashboardClick={switchToDashboard} 
            />
        );
    } else if (currentView === 'messages') {
        // Messages view
        mainContent = <MessagesView onNavigateToDashboard={switchToDashboard} />;
    } else if (currentView === 'profile') {
        // Profile view
        mainContent = <Profile />;
    }


    return (
        // Outer container for the whole application
        <div className="app-container" style={{ minHeight: '100vh', width: '100%' }}>
            
            {/* Header component (assumed to handle its own full width) */}
            <Header 
                className="header-area" 
                currentView={currentView} // Passed to Header for active link highlighting
                onBookServiceClick={switchToBooking} 
                onServicesClick={switchToServices}
                onMessagesClick={switchToMessages}
                onProfileClick={switchToProfile}
            />
            
            {/* The main content area now follows the header */}
            {mainContent}

        </div>
    );
}

export default App;
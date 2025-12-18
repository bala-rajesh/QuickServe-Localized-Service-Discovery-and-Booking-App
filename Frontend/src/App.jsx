import React, { useState } from 'react';
import './App.css'; 
import Header from './components/Header'; 
import Dashboard from './components/Dashboard'; 
import Summary from './components/Summary'; 
import BookingForm from './components/BookingForm'; 
import FindServices from './components/FindServices';
import MessagesView from './components/MessagesView'; 

const Profile = () => (
    <div className="main-booking-area" style={{padding: '30px 40px', backgroundColor: '#f7f9fc', minHeight: 'calc(100vh - 80px)'}}>
        <h1>User Profile & Settings</h1>
        <p>Manage your account, change your password, and update preferences here.</p>
    </div>
);

function App() {
    const [currentView, setCurrentView] = useState('dashboard');
    const [preSelectedCategory, setPreSelectedCategory] = useState(''); 

    const switchToBooking = (categoryName = '') => { 
        setPreSelectedCategory(categoryName);
        setCurrentView('booking');
    };
    
    const switchToDashboard = () => setCurrentView('dashboard');
    const switchToServices = () => setCurrentView('services');
    const switchToMessages = () => setCurrentView('messages');
    const switchToProfile = () => setCurrentView('profile');

    let mainContent;

    if (currentView === 'dashboard') {
        mainContent = (
            <div className="flex justify-center p-6 w-full"> 
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 lg:items-start">
                    <div className="lg:w-3/4">
                        <Dashboard className="main-content-area" />
                    </div>
                    <div className="lg:w-1/4">
                        <Summary className="summary-area" />
                    </div>
                </div>
            </div>
        );
    } else if (currentView === 'booking') {
        mainContent = (
            <div className="main-booking-area flex justify-center p-6" style={{ padding: '30px 0' }}> 
                <BookingForm onCancel={switchToDashboard} initialCategory={preSelectedCategory} /> 
            </div>
        );
    } else if (currentView === 'services') {
        mainContent = <FindServices onBookServiceClick={switchToBooking} onDashboardClick={switchToDashboard} />;
    } else if (currentView === 'messages') {
        mainContent = <MessagesView onNavigateToDashboard={switchToDashboard} />;
    } else if (currentView === 'profile') {
        mainContent = <Profile />;
    }

    return (
        <div className="app-container" style={{ minHeight: '100vh', width: '100%' }}>
            <Header 
                className="header-area" 
                currentView={currentView} 
                onBookServiceClick={switchToBooking} 
                onServicesClick={switchToServices}
                onMessagesClick={switchToMessages}
                onProfileClick={switchToProfile}
            /> 
            {mainContent}
        </div>
    );
}

export default App;
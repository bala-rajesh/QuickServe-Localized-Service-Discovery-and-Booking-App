// src/components/BookingForm.jsx

import React, { useState, useEffect } from 'react';

// --- Styling Definitions (The Missing Pieces) ---

const formGroupStyle = {
    marginBottom: '20px',
    display: 'flex',
    gap: '20px',
};

const inputStyle = {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    flexGrow: 1,
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
};

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#555',
};

const sectionTitleStyle = {
    color: '#007bff',
    fontWeight: '700',
    fontSize: '1.4rem',
    marginTop: '30px',
    marginBottom: '15px',
    borderBottom: '2px solid #eee',
    paddingBottom: '5px',
};

const largeTextAreaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px',
};

const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto',
};

const buttonPrimaryStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
};

const buttonSecondaryStyle = {
    backgroundColor: '#f1f1f1',
    color: '#333',
    padding: '12px 25px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
};


const BookingForm = ({ onCancel, initialCategory }) => {
    // 1. Service Details State
    const [category, setCategory] = useState(initialCategory || '');
    const [address, setAddress] = useState('');
    const [requestDetails, setRequestDetails] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    // Update category if initialCategory prop changes
    useEffect(() => {
        if (initialCategory) {
            setCategory(initialCategory);
        }
    }, [initialCategory]);


    // 2. Booking Step Management (Placeholder for future expansion)
    // For now, we only render Step 1
    const [currentStep, setCurrentStep] = useState(1);
    
    // Placeholder function for proceeding to the next step
    const handleContinue = (e) => {
        e.preventDefault();
        // In a real application, you would validate inputs before continuing
        if (category && address && requestDetails && date && time) {
             // For now, we'll just log and simulate moving to a "provider selection" step
             console.log("Service details gathered:", { category, address, requestDetails, date, time });
             setCurrentStep(2); 
        } else {
            // Use a custom message box instead of alert()
            console.error("Please fill in all required fields.");
            // You can implement a simple UI message display here if needed
        }
    };

    // --- Content Rendered based on Step (Currently only Step 1 is built out) ---

    const renderStep1 = () => (
        <div style={{ width: '100%' }}>
            
            <h3 style={sectionTitleStyle}>1. What & Where</h3>
            
            <div style={formGroupStyle}>
                <div style={{ flex: 1 }}>
                    <label htmlFor="service-category" style={labelStyle}>Service Category</label>
                    <select 
                        id="service-category"
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        style={inputStyle}
                    >
                        <option value="" disabled>Select a Category (e.g., Plumbing)</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Cleaning">Deep House Cleaning</option>
                        <option value="Electrical">Electrical Work</option>
                        <option value="Handyman">Handyman Services</option>
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label htmlFor="service-address" style={labelStyle}>Service Address</label>
                    <input 
                        id="service-address"
                        type="text" 
                        placeholder="Start typing your address..." 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        style={inputStyle}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="request-details" style={labelStyle}>Describe the Request (Be specific!)</label>
                <textarea 
                    id="request-details"
                    placeholder="E.g., The kitchen faucet is leaking heavily and needs a replacement cartridge. Any pictures or key details help!" 
                    value={requestDetails} 
                    onChange={(e) => setRequestDetails(e.target.value)} 
                    style={largeTextAreaStyle}
                />
            </div>
            
            <h3 style={sectionTitleStyle}>2. When Do You Need Service?</h3>

            <div style={formGroupStyle}>
                <div style={{ flex: 1 }}>
                    <label htmlFor="service-date" style={labelStyle}>Date</label>
                    <input 
                        id="service-date"
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        style={inputStyle}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label htmlFor="service-time" style={labelStyle}>Time Window</label>
                    <input 
                        id="service-time"
                        type="time" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        style={inputStyle}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button 
                    onClick={onCancel} 
                    style={buttonSecondaryStyle}
                >
                    Cancel / Back to Dashboard
                </button>
                <button 
                    onClick={handleContinue} 
                    style={buttonPrimaryStyle}
                >
                    Continue to Providers
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div style={{padding: '30px', textAlign: 'center'}}>
            <h3 style={{color: '#007bff', fontSize: '2rem'}}>Select Provider</h3>
            <p>This is where the user would select a professional based on quotes and reviews.</p>
            <p>Current step: {currentStep}</p>
            <button onClick={() => setCurrentStep(1)} style={buttonSecondaryStyle}>
                &larr; Back to Details
            </button>
        </div>
    );

    // --- Main Component Render ---
    return (
        <div style={cardStyle}>
            <h1 style={{ color: '#007bff', fontSize: '2rem', marginBottom: '10px' }}>
                Schedule a Service
            </h1>
            <p style={{ color: '#666', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                Enter your service request details below. We'll find the best professionals near you.
            </p>

            {/* Render current step content */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            
        </div>
    );
}

export default BookingForm;
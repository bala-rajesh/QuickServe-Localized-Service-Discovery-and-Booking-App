// src/components/FindServices.jsx (UPDATED)

import React from 'react';

// Sample data for service categories
const categories = [
    { name: "Plumbing", icon: "🔧", description: "Leaky faucets, pipe repairs, and installations." },
    { name: "Cleaning", icon: "🧹", description: "Deep cleaning, regular house keeping, and office cleaning." },
    { name: "Electrical", icon: "💡", description: "Wiring, fixture installation, and power repairs." },
    { name: "Home Repair", icon: "🔨", description: "Carpentry, drywall, and general handiwork." },
    { name: "Gardening", icon: "🌳", description: "Lawn care, pruning, and landscape maintenance." },
    { name: "Pest Control", icon: "🐜", description: "Insect and rodent removal and prevention." },
];

// ACCEPT THE NEW PROP: onDashboardClick
const FindServices = ({ onSelectService, onBookServiceClick, onDashboardClick }) => {
    
    // Inline styles for the component layout
    const pageStyle = { 
        padding: '30px 40px', 
        backgroundColor: '#f7f9fc', 
        minHeight: 'calc(100vh - 80px)' 
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
        gap: '30px',
        marginTop: '30px',
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        border: '1px solid #eee',
    };

    const handleCardClick = (categoryName) => {
        alert(`You selected: ${categoryName}. Redirecting to booking form...`);
        if (onBookServiceClick) {
            onBookServiceClick(categoryName); 
        }
    };
    
    // Style for the new button
    const backButtonStyle = {
        padding: '10px 20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        cursor: 'pointer', 
        backgroundColor: 'white',
        color: '#555',
        fontSize: '1rem',
        marginRight: '20px',
    };


    return (
        <div style={pageStyle} className="main-content-area">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h1>Discover Professional Services</h1>
                {/* --- NEW BUTTON HERE --- */}
                <button 
                    onClick={onDashboardClick}
                    style={backButtonStyle}
                >
                    &larr; Back to Dashboard
                </button>
            </div>
            
            <p style={{ color: '#666', marginBottom: '30px' }}>Browse categories and click to schedule an appointment.</p>
            
            <div style={gridStyle}>
                {categories.map((category) => (
                    <div 
                        key={category.name} 
                        style={cardStyle} 
                        onClick={() => handleCardClick(category.name)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{category.icon}</div>
                        <h2 style={{ color: '#007bff', marginBottom: '10px', fontSize: '1.5rem' }}>{category.name}</h2>
                        <p style={{ color: '#555' }}>{category.description}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default FindServices;
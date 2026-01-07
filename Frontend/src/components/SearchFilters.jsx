import React from 'react';

const SearchFilters = ({ filters, onFilterChange }) => {
    // Safety check: Prevents crash if filters prop is undefined
    const searchTerm = filters?.searchTerm || '';
    const serviceType = filters?.serviceType || '';

    // Style for the main horizontal container
    const containerStyle = {
        display: 'flex',
        gap: '16px', // This creates the physical separation you need
        width: '100%',
        alignItems: 'center',
        marginBottom: '24px'
    };

    // Wrapper for the search bar to make it expand correctly
    const searchWrapperStyle = {
        position: 'relative',
        flex: 2, // Allows the search bar to take up more proportional space
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px 12px 40px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        boxSizing: 'border-box', // Crucial to prevent width overflow
    };

    const selectStyle = {
        flex: 1, // Ensures dropdowns share remaining space equally
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        backgroundColor: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
        minWidth: '160px'
    };

    return (
        <div style={containerStyle}>
            {/* Search Input Section */}
            <div style={searchWrapperStyle}>
                <span style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    fontSize: '1.2rem'
                }}>🔍</span>
                <input 
                    type="text" 
                    placeholder="Search for a booking..." 
                    value={searchTerm}
                    onChange={(e) => onFilterChange('searchTerm', e.target.value)}
                    style={inputStyle}
                />
            </div>

            {/* Services Dropdown - Now Separated */}
            <select 
                value={serviceType}
                onChange={(e) => onFilterChange('serviceType', e.target.value)}
                style={selectStyle}
            >
                <option value="">All Services</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Repair">Repair</option>
                <option value="Installation">Installation</option>
                <option value="Electrical">Electrical</option>
            </select>

            {/* Time Dropdown */}
            <select style={selectStyle}>
                <option value="">Any Time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
            </select>
        </div>
    );
};

export default SearchFilters;
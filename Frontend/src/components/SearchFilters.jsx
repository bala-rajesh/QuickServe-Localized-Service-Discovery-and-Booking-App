// src/components/SearchFilters.jsx

import React, { useState } from 'react';

function SearchFilters() {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [serviceFilter, setServiceFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const filterStyle = {
        padding: '8px 15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
    };

    return (
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            
            <div style={{ position: 'relative', flexGrow: 1 }}>
                <span style={{ position: 'absolute', left: '15px', top: '10px', color: '#666' }}>🔍</span>
                <input 
                    type="text" 
                    placeholder="Search for a booking..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    style={{ 
                        width: '100%', 
                        padding: '10px 10px 10px 45px', 
                        border: '1px solid #ccc', 
                        borderRadius: '5px' 
                    }}
                />
            </div>

            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} style={filterStyle}>
                <option value="" disabled>Service Type</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Repair">Repair</option>
            </select>

            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={filterStyle}>
                <option value="" disabled>Date Range</option>
                <option value="Today">Today</option>
                <option value="ThisWeek">This Week</option>
                <option value="ThisMonth">This Month</option>
            </select>
        </div>
    );
}

export default SearchFilters;
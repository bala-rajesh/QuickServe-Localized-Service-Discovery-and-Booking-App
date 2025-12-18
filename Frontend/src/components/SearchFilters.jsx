// src/components/SearchFilters.jsx
import React from 'react';

function SearchFilters({ filters, onFilterChange }) {
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
            
            {/* Search Input */}
            <div style={{ position: 'relative', flexGrow: 1 }}>
                <span style={{ position: 'absolute', left: '15px', top: '10px', color: '#666' }}>🔍</span>
                <input 
                    type="text" 
                    placeholder="Search for a booking..." 
                    value={filters.searchTerm} 
                    onChange={(e) => onFilterChange('searchTerm', e.target.value)} 
                    style={{ 
                        width: '100%', 
                        padding: '10px 10px 10px 45px', 
                        border: '1px solid #ccc', 
                        borderRadius: '5px' 
                    }}
                />
            </div>

            {/* Service Type Filter */}
            <select 
                value={filters.serviceType} 
                onChange={(e) => onFilterChange('serviceType', e.target.value)} 
                style={filterStyle}
            >
                <option value="">All Services</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Repair">Repair</option>
                <option value="Installation">Installation</option>
                <option value="Painting">Painting</option>
            </select>

            {/* Date Range Filter */}
            <select 
                value={filters.dateRange} 
                onChange={(e) => onFilterChange('dateRange', e.target.value)} 
                style={filterStyle}
            >
                <option value="">Any Time</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
            </select>
        </div>
    );
}

export default SearchFilters;
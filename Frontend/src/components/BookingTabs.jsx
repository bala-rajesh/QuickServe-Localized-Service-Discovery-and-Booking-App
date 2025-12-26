import React from 'react';

function BookingTabs({ activeTab, onTabChange }) {
  const tabs = ['All', 'Booked', 'In Progress', 'Cancelled', 'Rejected'];
  
  return (
    <div style={{ 
      display: 'inline-flex', 
      backgroundColor: '#f1f5f9', 
      padding: '4px', 
      borderRadius: '10px', 
      gap: '4px',
      marginBottom: '10px'
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button 
            key={tab} 
            onClick={() => onTabChange(tab)} 
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              backgroundColor: isActive ? 'white' : 'transparent',
              color: isActive ? '#2563eb' : '#64748b',
              boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default BookingTabs;